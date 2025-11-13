// admin-service.js - Service untuk Admin Panel dengan Firebase

class AdminService {
    constructor() {
        this.stats = {
            totalVehicles: 0,
            activeBookings: 0,
            totalCustomers: 0,
            monthlyRevenue: 0
        };
        this.unsubscribeFunctions = [];
    }

    // === DASHBOARD STATS ===
    async loadDashboardStats() {
        try {
            console.log('Loading dashboard stats...');
            
            // Total vehicles
            const carsSnapshot = await db.collection('cars').get();
            this.stats.totalVehicles = carsSnapshot.size;

            // Active bookings (pending + confirmed)
            const bookingsSnapshot = await db.collection('bookings')
                .where('status', 'in', ['pending', 'confirmed'])
                .get();
            this.stats.activeBookings = bookingsSnapshot.size;

            // Total customers
            const usersSnapshot = await db.collection('users').get();
            this.stats.totalCustomers = usersSnapshot.size;

            // Monthly revenue
            const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const monthlyBookings = await db.collection('bookings')
                .where('createdAt', '>=', startOfMonth)
                .where('status', 'in', ['confirmed', 'completed'])
                .get();
            
            this.stats.monthlyRevenue = monthlyBookings.docs.reduce((total, doc) => {
                const booking = doc.data();
                return total + (booking.totalPrice || 0);
            }, 0);

            this.updateDashboardUI();
            return this.stats;
        } catch (error) {
            console.error('Error loading stats:', error);
            return this.stats;
        }
    }

    updateDashboardUI() {
        // Update stat cards
        const statCards = document.querySelectorAll('.stat-card h3');
        if (statCards.length >= 4) {
            statCards[0].textContent = this.stats.totalVehicles;
            statCards[1].textContent = this.stats.activeBookings;
            statCards[2].textContent = this.stats.totalCustomers;
            statCards[3].textContent = `Rp ${(this.stats.monthlyRevenue / 1000000).toFixed(0)}Jt`;
        }
    }

    // === VEHICLE MANAGEMENT ===
    async loadVehicles() {
        try {
            const snapshot = await db.collection('cars')
                .orderBy('createdAt', 'desc')
                .get();
            
            const vehicles = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.displayVehiclesTable(vehicles);
            return vehicles;
        } catch (error) {
            console.error('Error loading vehicles:', error);
            this.displayVehiclesTable([]);
            return [];
        }
    }

    displayVehiclesTable(vehicles) {
        const tbody = document.getElementById('vehiclesTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (vehicles.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #718096;">
                        <i class="fas fa-car" style="font-size: 3rem; margin-bottom: 15px; display: block; color: #e2e8f0;"></i>
                        Belum ada data mobil
                    </td>
                </tr>
            `;
            return;
        }

        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            
            // Determine status badge
            let statusBadge = '';
            let statusClass = '';
            if (vehicle.available > 0) {
                statusBadge = 'Tersedia';
                statusClass = 'status-available';
            } else {
                statusBadge = 'Habis';
                statusClass = 'status-maintenance';
            }
            
            // Determine popularity stars
            let popularityStars = '';
            const popularity = vehicle.rentalCount || 0;
            const stars = Math.min(5, Math.ceil(popularity / 10));
            for (let i = 0; i < 5; i++) {
                if (i < stars) {
                    popularityStars += '<i class="fas fa-star text-warning"></i>';
                } else {
                    popularityStars += '<i class="far fa-star text-muted"></i>';
                }
            }

            row.innerHTML = `
                <td>
                    <input type="checkbox" class="vehicle-checkbox" data-id="${vehicle.id}">
                </td>
                <td>
                    <div style="display: flex; align-items: center;">
                        <img src="${vehicle.image}" alt="${vehicle.name}" 
                             style="width: 50px; height: 35px; object-fit: cover; border-radius: 6px; margin-right: 12px;"
                             onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70'">
                        <div>
                            <div style="font-weight: 600;">${vehicle.name}</div>
                            <div style="font-size: 0.8rem; color: #718096;">${vehicle.specs?.engine || 'N/A'}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span style="text-transform: capitalize; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                        ${vehicle.category || vehicle.type}
                    </span>
                </td>
                <td style="font-weight: 600; color: #e63946;">
                    Rp ${vehicle.price?.toLocaleString('id-ID') || '0'}
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${statusBadge}</span>
                </td>
                <td>
                    <span style="font-weight: 600; color: ${vehicle.available > 0 ? '#38a169' : '#e53e3e'}">
                        ${vehicle.available || 0} unit
                    </span>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        ${popularityStars}
                        <span style="font-size: 0.8rem; color: #718096; margin-left: 5px;">
                            ${popularity}
                        </span>
                    </div>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-sm btn-primary" onclick="adminService.editVehicle('${vehicle.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-sm btn-danger" onclick="adminService.deleteVehicle('${vehicle.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    async addVehicle(vehicleData) {
        try {
            console.log('Adding vehicle:', vehicleData);
            
            // Upload image jika ada file
            let imageUrl = vehicleData.image;
            if (vehicleData.imageFile) {
                imageUrl = await this.uploadImage(vehicleData.imageFile);
            }

            const vehicleDoc = {
                name: vehicleData.name,
                category: vehicleData.category,
                price: parseInt(vehicleData.price),
                available: parseInt(vehicleData.stock),
                image: imageUrl,
                specs: {
                    engine: vehicleData.specs.engine,
                    power: vehicleData.specs.power,
                    transmission: vehicleData.specs.transmission,
                    seats: parseInt(vehicleData.specs.seats)
                },
                rentalCount: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await db.collection('cars').add(vehicleDoc);
            
            this.showNotification('Mobil berhasil ditambahkan!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Error adding vehicle:', error);
            this.showNotification('Gagal menambah mobil: ' + error.message, 'error');
            return { success: false, error: error.message };
        }
    }

    async updateVehicle(vehicleId, vehicleData) {
        try {
            const updateData = {
                name: vehicleData.name,
                category: vehicleData.category,
                price: parseInt(vehicleData.price),
                available: parseInt(vehicleData.stock),
                specs: {
                    engine: vehicleData.specs.engine,
                    power: vehicleData.specs.power,
                    transmission: vehicleData.specs.transmission,
                    seats: parseInt(vehicleData.specs.seats)
                },
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Upload image baru jika ada
            if (vehicleData.imageFile) {
                updateData.image = await this.uploadImage(vehicleData.imageFile);
            }

            await db.collection('cars').doc(vehicleId).update(updateData);
            
            this.showNotification('Mobil berhasil diupdate!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Error updating vehicle:', error);
            this.showNotification('Gagal update mobil: ' + error.message, 'error');
            return { success: false, error: error.message };
        }
    }

    async deleteVehicle(vehicleId) {
        try {
            if (!confirm('Apakah Anda yakin ingin menghapus mobil ini?')) {
                return { success: false, error: 'Dibatalkan' };
            }

            await db.collection('cars').doc(vehicleId).delete();
            
            this.showNotification('Mobil berhasil dihapus!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            this.showNotification('Gagal menghapus mobil: ' + error.message, 'error');
            return { success: false, error: error.message };
        }
    }

    async editVehicle(vehicleId) {
        try {
            const doc = await db.collection('cars').doc(vehicleId).get();
            if (!doc.exists) {
                this.showNotification('Mobil tidak ditemukan!', 'error');
                return;
            }

            const vehicle = { id: doc.id, ...doc.data() };
            this.openVehicleModal(vehicle);
        } catch (error) {
            console.error('Error loading vehicle for edit:', error);
            this.showNotification('Gagal memuat data mobil', 'error');
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
            return bookings;
        } catch (error) {
            console.error('Error loading bookings:', error);
            this.displayBookingsTable([]);
            return [];
        }
    }

    displayBookingsTable(bookings) {
        const tbody = document.getElementById('bookingsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (bookings.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: #718096;">
                        <i class="fas fa-calendar-times" style="font-size: 3rem; margin-bottom: 15px; display: block; color: #e2e8f0;"></i>
                        Belum ada data pemesanan
                    </td>
                </tr>
            `;
            return;
        }

        bookings.forEach(booking => {
            const row = document.createElement('tr');
            
            // Format tanggal
            const createdAt = booking.createdAt?.toDate();
            const dateString = createdAt ? createdAt.toLocaleDateString('id-ID') : '-';
            
            // Status badge
            let statusBadge = '';
            let statusClass = '';
            switch(booking.status) {
                case 'pending':
                    statusBadge = 'Pending';
                    statusClass = 'status-maintenance';
                    break;
                case 'confirmed':
                    statusBadge = 'Dikonfirmasi';
                    statusClass = 'status-available';
                    break;
                case 'completed':
                    statusBadge = 'Selesai';
                    statusClass = 'status-rented';
                    break;
                case 'cancelled':
                    statusBadge = 'Dibatalkan';
                    statusClass = 'status-maintenance';
                    break;
                default:
                    statusBadge = 'Pending';
                    statusClass = 'status-maintenance';
            }

            row.innerHTML = `
                <td style="font-weight: 600; color: #e63946;">
                    ${booking.bookingCode || booking.id}
                </td>
                <td>
                    <div>
                        <div style="font-weight: 600;">${booking.customerName}</div>
                        <div style="font-size: 0.8rem; color: #718096;">${booking.customerPhone}</div>
                    </div>
                </td>
                <td>${booking.carName}</td>
                <td>
                    <div>
                        <div>${booking.pickupDate} - ${booking.returnDate}</div>
                        <div style="font-size: 0.8rem; color: #718096;">${dateString}</div>
                    </div>
                </td>
                <td>${booking.days} hari</td>
                <td style="font-weight: 600; color: #e63946;">
                    Rp ${booking.totalPrice?.toLocaleString('id-ID') || '0'}
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${statusBadge}</span>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn-sm btn-primary" onclick="adminService.viewBooking('${booking.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-sm btn-secondary" onclick="adminService.updateBookingStatus('${booking.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    async updateBookingStatus(bookingId, newStatus) {
        try {
            if (!newStatus) {
                newStatus = prompt('Masukkan status baru (pending/confirmed/completed/cancelled):');
                if (!newStatus) return;
            }

            await db.collection('bookings').doc(bookingId).update({
                status: newStatus,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Jika booking dikonfirmasi, kurangi stok mobil
            if (newStatus === 'confirmed' || newStatus === 'completed') {
                const bookingDoc = await db.collection('bookings').doc(bookingId).get();
                const booking = bookingDoc.data();
                
                if (booking.carId && booking.vehicleType === 'car') {
                    const carDoc = await db.collection('cars').doc(booking.carId).get();
                    const car = carDoc.data();
                    
                    if (car && car.available > 0) {
                        await db.collection('cars').doc(booking.carId).update({
                            available: firebase.firestore.FieldValue.increment(-1)
                        });
                    }
                }
            }

            this.showNotification(`Status booking berhasil diupdate ke: ${newStatus}`, 'success');
            return { success: true };
        } catch (error) {
            console.error('Error updating booking:', error);
            this.showNotification('Gagal update status booking', 'error');
            return { success: false, error: error.message };
        }
    }

    async viewBooking(bookingId) {
        try {
            const doc = await db.collection('bookings').doc(bookingId).get();
            if (!doc.exists) {
                this.showNotification('Booking tidak ditemukan!', 'error');
                return;
            }

            const booking = { id: doc.id, ...doc.data() };
            this.showBookingDetails(booking);
        } catch (error) {
            console.error('Error viewing booking:', error);
            this.showNotification('Gagal memuat detail booking', 'error');
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
            return reviews;
        } catch (error) {
            console.error('Error loading reviews:', error);
            this.displayReviewsTable([]);
            return [];
        }
    }

    displayReviewsTable(reviews) {
        // Implementasi display reviews table
        console.log('Reviews loaded:', reviews);
    }

    async updateReviewStatus(reviewId, status) {
        try {
            await db.collection('reviews').doc(reviewId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            this.showNotification(`Status review berhasil diupdate`, 'success');
            return { success: true };
        } catch (error) {
            console.error('Error updating review:', error);
            this.showNotification('Gagal update status review', 'error');
            return { success: false, error: error.message };
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

    showNotification(message, type = 'info') {
        // Buat notification element
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;

        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#38a169' : type === 'error' ? '#e53e3e' : '#3182ce'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Hapus setelah 3 detik
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showBookingDetails(booking) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Detail Booking - ${booking.bookingCode}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body" style="padding: 25px;">
                    <div style="display: grid; gap: 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <strong>Nama Pelanggan:</strong>
                                <div>${booking.customerName}</div>
                            </div>
                            <div>
                                <strong>Telepon:</strong>
                                <div>${booking.customerPhone}</div>
                            </div>
                        </div>
                        <div>
                            <strong>Kendaraan:</strong>
                            <div>${booking.carName}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <strong>Tanggal Sewa:</strong>
                                <div>${booking.pickupDate} - ${booking.returnDate}</div>
                            </div>
                            <div>
                                <strong>Durasi:</strong>
                                <div>${booking.days} hari</div>
                            </div>
                        </div>
                        <div>
                            <strong>Lokasi Pengambilan:</strong>
                            <div>${booking.pickupLocation}</div>
                        </div>
                        <div>
                            <strong>Total Harga:</strong>
                            <div style="font-size: 1.2rem; font-weight: 600; color: #e63946;">
                                Rp ${booking.totalPrice?.toLocaleString('id-ID') || '0'}
                            </div>
                        </div>
                        <div>
                            <strong>Status:</strong>
                            <div>
                                <span class="status-badge status-${booking.status === 'confirmed' ? 'available' : 'maintenance'}">
                                    ${booking.status}
                                </span>
                            </div>
                        </div>
                        ${booking.promoCode ? `
                            <div>
                                <strong>Kode Promo:</strong>
                                <div>${booking.promoCode} (Diskon ${booking.discount}%)</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Tutup</button>
                    <button class="btn-primary" onclick="adminService.updateBookingStatus('${booking.id}')">
                        Ubah Status
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    openVehicleModal(vehicle = null) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${vehicle ? 'Edit Mobil' : 'Tambah Mobil Baru'}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <form id="vehicleFormModal" class="modal-form">
                    <input type="hidden" id="vehicleId" value="${vehicle?.id || ''}">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nama Mobil</label>
                            <input type="text" id="vehicleName" value="${vehicle?.name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Kategori</label>
                            <select id="vehicleCategory" required>
                                <option value="">Pilih Kategori</option>
                                <option value="family" ${vehicle?.category === 'family' ? 'selected' : ''}>Family</option>
                                <option value="travel" ${vehicle?.category === 'travel' ? 'selected' : ''}>Travel</option>
                                <option value="supercar" ${vehicle?.category === 'supercar' ? 'selected' : ''}>Supercar</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Harga per Hari (Rp)</label>
                            <input type="number" id="vehiclePrice" value="${vehicle?.price || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Stok Tersedia</label>
                            <input type="number" id="vehicleStock" value="${vehicle?.available || ''}" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Spesifikasi Mesin</label>
                            <input type="text" id="vehicleEngine" value="${vehicle?.specs?.engine || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Daya</label>
                            <input type="text" id="vehiclePower" value="${vehicle?.specs?.power || ''}" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Transmisi</label>
                            <input type="text" id="vehicleTransmission" value="${vehicle?.specs?.transmission || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Jumlah Seat</label>
                            <input type="number" id="vehicleSeats" value="${vehicle?.specs?.seats || ''}" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Upload Gambar</label>
                        <div class="file-upload">
                            <input type="file" id="vehicleImage" accept="image/*">
                            <label for="vehicleImage" class="file-label">
                                <i class="fas fa-upload"></i>
                                ${vehicle?.image ? 'Ganti Gambar' : 'Pilih Gambar'}
                            </label>
                        </div>
                        ${vehicle?.image ? `
                            <div id="imagePreview" class="image-preview">
                                <img src="${vehicle.image}" alt="Preview" style="max-width: 200px;">
                            </div>
                        ` : '<div id="imagePreview" class="image-preview"></div>'}
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal').remove()">Batal</button>
                        <button type="submit" class="btn-primary">
                            ${vehicle ? 'Update Mobil' : 'Simpan Mobil'}
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        const form = document.getElementById('vehicleFormModal');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleVehicleFormSubmit(vehicle);
        });

        // Handle image preview
        const imageInput = document.getElementById('vehicleImage');
        const imagePreview = document.getElementById('imagePreview');
        
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    async handleVehicleFormSubmit(originalVehicle = null) {
        const formData = {
            name: document.getElementById('vehicleName').value,
            category: document.getElementById('vehicleCategory').value,
            price: document.getElementById('vehiclePrice').value,
            stock: document.getElementById('vehicleStock').value,
            specs: {
                engine: document.getElementById('vehicleEngine').value,
                power: document.getElementById('vehiclePower').value,
                transmission: document.getElementById('vehicleTransmission').value,
                seats: document.getElementById('vehicleSeats').value
            }
        };

        // Handle image upload
        const imageInput = document.getElementById('vehicleImage');
        if (imageInput.files[0]) {
            formData.imageFile = imageInput.files[0];
        } else if (originalVehicle?.image) {
            formData.image = originalVehicle.image;
        }

        const vehicleId = document.getElementById('vehicleId').value;

        let result;
        if (vehicleId) {
            result = await this.updateVehicle(vehicleId, formData);
        } else {
            result = await this.addVehicle(formData);
        }

        if (result.success) {
            // Tutup modal dan reload data
            document.querySelector('.modal.active')?.remove();
            await this.loadVehicles();
            await this.loadDashboardStats();
        }
    }

    // === REAL-TIME UPDATES ===
    setupRealTimeListeners() {
        // Real-time vehicles
        const unsubscribeCars = db.collection('cars')
            .orderBy('createdAt', 'desc')
            .onSnapshot(() => {
                this.loadVehicles();
                this.loadDashboardStats();
            });

        // Real-time bookings
        const unsubscribeBookings = db.collection('bookings')
            .orderBy('createdAt', 'desc')
            .onSnapshot(() => {
                this.loadBookings();
                this.loadDashboardStats();
            });

        // Real-time reviews
        const unsubscribeReviews = db.collection('reviews')
            .orderBy('createdAt', 'desc')
            .onSnapshot(() => {
                this.loadReviews();
            });

        this.unsubscribeFunctions.push(unsubscribeCars, unsubscribeBookings, unsubscribeReviews);
    }

    // === CLEANUP ===
    cleanup() {
        this.unsubscribeFunctions.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.unsubscribeFunctions = [];
    }
}

// Initialize admin service
const adminService = new AdminService();