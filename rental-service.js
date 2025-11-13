// rental-service.js
class RentalService {
    constructor() {
        this.cars = [];
        this.reviews = [];
        this.currentUser = null;
    }

    // === AUTHENTICATION ===
    async register(email, password, userData) {
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            // Simpan data user tambahan
            await db.collection('users').doc(user.uid).set({
                ...userData,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            this.currentUser = user;
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            this.currentUser = user;
            return { success: true, user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        try {
            await auth.signOut();
            this.currentUser = null;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // === CAR MANAGEMENT ===
    async loadCars() {
        return new Promise((resolve, reject) => {
            const unsubscribe = db.collection('cars')
                .where('available', '>', 0)
                .onSnapshot(snapshot => {
                    this.cars = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    this.displayCars(this.cars);
                    this.displayRecommendedCars();
                    resolve(this.cars);
                }, reject);
            
            // Simpan unsubscribe function untuk cleanup
            this.unsubscribeCars = unsubscribe;
        });
    }

    // === BOOKING SYSTEM ===
    async createBooking(bookingData) {
        try {
            // 1. Validasi stok
            const carDoc = await db.collection('cars').doc(bookingData.carId).get();
            const car = carDoc.data();
            
            if (!car || car.available < 1) {
                throw new Error('Mobil tidak tersedia');
            }

            // 2. Kurangi stok
            await db.collection('cars').doc(bookingData.carId).update({
                available: firebase.firestore.FieldValue.increment(-1),
                rentalCount: firebase.firestore.FieldValue.increment(1)
            });

            // 3. Buat booking
            const bookingRef = await db.collection('bookings').add({
                ...bookingData,
                userId: this.currentUser?.uid || 'guest',
                status: 'pending',
                bookingCode: 'BK' + Date.now(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // 4. Kirim WhatsApp notification
            this.sendAdminNotification(bookingData, bookingRef.id);

            return { 
                success: true, 
                bookingId: bookingRef.id,
                bookingCode: 'BK' + Date.now()
            };
        } catch (error) {
            console.error('Booking error:', error);
            return { success: false, error: error.message };
        }
    }

    // === REVIEW SYSTEM ===
    async submitReview(reviewData) {
        try {
            await db.collection('reviews').add({
                ...reviewData,
                userId: this.currentUser?.uid || 'guest',
                status: 'approved',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async loadReviews() {
        return new Promise((resolve, reject) => {
            const unsubscribe = db.collection('reviews')
                .where('status', '==', 'approved')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .onSnapshot(snapshot => {
                    this.reviews = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    this.displayReviews();
                    resolve(this.reviews);
                }, reject);
            
            this.unsubscribeReviews = unsubscribe;
        });
    }

    // === NOTIFICATION SYSTEM ===
    sendAdminNotification(bookingData, bookingId) {
        const message = `📋 BOOKING BARU - LowRen Car's

Kode: ${bookingId}
Nama: ${bookingData.customerName}
Telepon: ${bookingData.customerPhone}
Mobil: ${bookingData.carName}
Tanggal: ${bookingData.pickupDate} s/d ${bookingData.returnDate}
Lokasi: ${this.getLocationName(bookingData.pickupLocation)}
Total: Rp ${bookingData.totalPrice.toLocaleString('id-ID')}

Segera konfirmasi ketersediaan!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6285136236798?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // === UTILITIES ===
    getLocationName(locationValue) {
        const locations = {
            'jakarta': 'Jakarta', 'bandung': 'Bandung', 'bogor': 'Bogor',
            'semarang': 'Semarang', 'solo': 'Solo', 'yogyakarta': 'Yogyakarta', 
            'surabaya': 'Surabaya', 'malang': 'Malang', 'bali': 'Bali'
        };
        return locations[locationValue] || locationValue;
    }

    // === CLEANUP ===
    cleanup() {
        if (this.unsubscribeCars) this.unsubscribeCars();
        if (this.unsubscribeReviews) this.unsubscribeReviews();
    }
}

// Initialize service
const rentalService = new RentalService();