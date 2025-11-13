// Admin Dashboard JavaScript

// Sample Data
const adminVehicles = [
    {
        id: 1,
        name: "Porsche 911 Carrera",
        category: "family",
        price: 2500000,
        status: "available",
        stock: 8,
        popularity: 45,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "3.0L Twin-Turbo",
            power: "379 HP",
            transmission: "8-Speed PDK",
            seats: "4"
        }
    },
    {
        id: 2,
        name: "Ferrari 488 Spider",
        category: "travel",
        price: 4500000,
        status: "rented",
        stock: 5,
        popularity: 38,
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "3.9L V8 Twin-Turbo",
            power: "661 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        }
    }
];

// DOM Elements
const vehiclesTableBody = document.getElementById('vehiclesTableBody');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');

// Initialize Admin Dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadVehiclesTable();
    setupEventListeners();
});

// Load Vehicles Table
function loadVehiclesTable() {
    if (!vehiclesTableBody) return;
    
    vehiclesTableBody.innerHTML = '';
    
    adminVehicles.forEach(vehicle => {
        const row = document.createElement('tr');
        
        // Determine status badge
        let statusBadge = '';
        let statusClass = '';
        switch(vehicle.status) {
            case 'available':
                statusBadge = 'Tersedia';
                statusClass = 'status-available';
                break;
            case 'rented':
                statusBadge = 'Disewa';
                statusClass = 'status-rented';
                break;
            case 'maintenance':
                statusBadge = 'Maintenance';
                statusClass = 'status-maintenance';
                break;
        }
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center;">
                    <img src="${vehicle.image}" alt="${vehicle.name}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 6px; margin-right: 12px;">
                    <div>
                        <div style="font-weight: 600;">${vehicle.name}</div>
                        <div style="font-size: 0.8rem; color: #718096;">${vehicle.specs.engine}</div>
                    </div>
                </div>
            </td>
            <td>
                <span style="text-transform: capitalize;">${vehicle.category}</span>
            </td>
            <td>Rp ${vehicle.price.toLocaleString('id-ID')}</td>
            <td><span class="status-badge ${statusClass}">${statusBadge}</span></td>
            <td>${vehicle.stock} unit</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-sm btn-primary" onclick="editVehicle(${vehicle.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-danger" onclick="deleteVehicle(${vehicle.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        vehiclesTableBody.appendChild(row);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Add Vehicle Button
    const addVehicleBtn = document.getElementById('addVehicleBtn');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', function() {
            alert('Fitur tambah mobil akan segera hadir!');
        });
    }
}

// Vehicle Actions
function editVehicle(vehicleId) {
    alert(`Edit mobil ID: ${vehicleId} - Fitur akan segera hadir!`);
}

function deleteVehicle(vehicleId) {
    if (confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
        alert(`Mobil ID: ${vehicleId} berhasil dihapus!`);
        // In real app, you would update the table here
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}
// admin/script.js - Diupdate dengan Firebase
class AdminService {
    constructor() {
        this.stats = {
            totalVehicles: 0,
            activeBookings: 0,
            totalCustomers: 0,
            monthlyRevenue: 0
        };
    }

    // === DASHBOARD STATS ===
    async loadDashboardStats() {
        try {
            // Total vehicles
            const carsSnapshot = await db.collection('cars').get();
            this.stats.totalVehicles = carsSnapshot.size;

            // Active bookings
            const bookingsSnapshot = await db.collection('bookings')
                .where('status', 'in', ['pending', 'confirmed'])
                .get();
            this.stats.activeBookings = bookingsSnapshot.size;

            // Total customers
            const usersSnapshot = await db.collection('users').get();
            this.stats.totalCustomers = usersSnapshot.size;

            // Monthly revenue (contoh sederhana)
            const monthlyBookings = await db.collection('bookings')
                .where('createdAt', '>=', new Date(new Date().getFullYear(), new Date().getMonth(), 1))
                .get();
            
            this.stats.monthlyRevenue = monthlyBookings.docs.reduce((total, doc) => {
                return total + (doc.data().totalPrice || 0);
            }, 0);

            this.updateDashboardUI();
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    updateDashboardUI() {
        document.querySelectorAll('.stat-card h3')[0].textContent = this.stats.totalVehicles;
        document.querySelectorAll('.stat-card h3')[1].textContent = this.stats.activeBookings;
        document.querySelectorAll('.stat-card h3')[2].textContent = this.stats.totalCustomers;
        document.querySelectorAll('.stat-card h3')[3].textContent = `Rp ${(this.stats.monthlyRevenue / 1000000).toFixed(0)}Jt`;
    }

    // === VEHICLE MANAGEMENT ===
    async loadVehicles() {
        try {
            const snapshot = await db.collection('cars').get();
            const vehicles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.displayVehiclesTable(vehicles);
        } catch (error) {
            console.error('Error loading vehicles:', error);
        }
    }

    async addVehicle(vehicleData) {
        try {
            // Upload image jika ada
            if (vehicleData.imageFile) {
                const imageUrl = await this.uploadImage(vehicleData.imageFile);
                vehicleData.image = imageUrl;
                delete vehicleData.imageFile;
            }

            await db.collection('cars').add({
                ...vehicleData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                rentalCount: 0,
                available: parseInt(vehicleData.stock)
            });

            this.loadVehicles();
            return true;
        } catch (error) {
            console.error('Error adding vehicle:', error);
            return false;
        }
    }

    async updateVehicle(vehicleId, vehicleData) {
        try {
            await db.collection('cars').doc(vehicleId).update(vehicleData);
            this.loadVehicles();
            return true;
        } catch (error) {
            console.error('Error updating vehicle:', error);
            return false;
        }
    }

    async deleteVehicle(vehicleId) {
        try {
            await db.collection('cars').doc(vehicleId).delete();
            this.loadVehicles();
            return true;
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            return false;
        }
    }

    // === BOOKING MANAGEMENT ===
    async loadBookings() {
        try {
            const snapshot = await db.collection('bookings')
                .orderBy('createdAt', 'desc')
                .get();
            
            const bookings = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.displayBookingsTable(bookings);
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }

    async updateBookingStatus(bookingId, status) {
        try {
            await db.collection('bookings').doc(bookingId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Jika booking confirmed, kurangi stok mobil
            if (status === 'confirmed') {
                const booking = await db.collection('bookings').doc(bookingId).get();
                const bookingData = booking.data();
                
                if (bookingData.carId) {
                    const car = await db.collection('cars').doc(bookingData.carId).get();
                    const currentStock = car.data().available;
                    await db.collection('cars').doc(bookingData.carId).update({
                        available: currentStock - 1
                    });
                }
            }

            this.loadBookings();
            return true;
        } catch (error) {
            console.error('Error updating booking:', error);
            return false;
        }
    }

    // === REVIEW MANAGEMENT ===
    async loadReviews() {
        try {
            const snapshot = await db.collection('reviews')
                .orderBy('createdAt', 'desc')
                .get();
            
            const reviews = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.displayReviewsTable(reviews);
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }

    async updateReviewStatus(reviewId, status) {
        try {
            await db.collection('reviews').doc(reviewId).update({
                status: status
            });
            this.loadReviews();
            return true;
        } catch (error) {
            console.error('Error updating review:', error);
            return false;
        }
    }

    // === UTILITY FUNCTIONS ===
    async uploadImage(file) {
        try {
            const storageRef = storage.ref();
            const imageRef = storageRef.child('cars/' + Date.now() + '_' + file.name);
            const snapshot = await imageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    // === REAL-TIME UPDATES ===
    setupRealTimeListeners() {
        // Real-time vehicles
        db.collection('cars').onSnapshot(() => {
            this.loadVehicles();
            this.loadDashboardStats();
        });

        // Real-time bookings
        db.collection('bookings').onSnapshot(() => {
            this.loadBookings();
            this.loadDashboardStats();
        });

        // Real-time reviews
        db.collection('reviews').onSnapshot(() => {
            this.loadReviews();
        });
    }
}

// Initialize admin service
const adminService = new AdminService();

// Update existing admin functions
async function handleVehicleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('vehicleName').value,
        category: document.getElementById('vehicleCategory').value,
        price: parseInt(document.getElementById('vehiclePrice').value),
        stock: parseInt(document.getElementById('vehicleStock').value),
        specs: {
            engine: document.getElementById('vehicleEngine').value,
            power: document.getElementById('vehiclePower').value,
            transmission: document.getElementById('vehicleTransmission').value,
            seats: parseInt(document.getElementById('vehicleSeats').value)
        }
    };

    // Handle image upload
    const imageInput = document.getElementById('vehicleImage');
    if (imageInput.files[0]) {
        formData.imageFile = imageInput.files[0];
    }

    const success = await adminService.addVehicle(formData);
    
    if (success) {
        alert('Data mobil berhasil disimpan!');
        closeVehicleModal();
    } else {
        alert('Gagal menyimpan data mobil!');
    }
}

// Update pada initialization
document.addEventListener('DOMContentLoaded', function() {
    // Load initial data
    adminService.loadDashboardStats();
    adminService.loadVehicles();
    adminService.loadBookings();
    adminService.loadReviews();
    
    // Setup real-time listeners
    adminService.setupRealTimeListeners();
    
    // Existing initialization code...
});