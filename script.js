// Data mobil sport dengan 10 unit untuk setiap kategori
const carsData = [
    // Family Cars (10 mobil)
    {
        id: 1,
        name: "Porsche 911 Carrera",
        type: "family",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "3.0L Twin-Turbo",
            power: "379 HP",
            transmission: "8-Speed PDK",
            seats: "4"
        },
        price: 2500000,
        available: 10,
        featured: true
    },
    {
        id: 2,
        name: "BMW M8 Competition",
        type: "family",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
        specs: {
            engine: "4.4L V8 Twin-Turbo",
            power: "617 HP",
            transmission: "8-Speed Automatic",
            seats: "4"
        },
        price: 2800000,
        available: 10,
        featured: false
    },
    {
        id: 3,
        name: "Nissan GT-R",
        type: "family",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        specs: {
            engine: "3.8L V6 Twin-Turbo",
            power: "565 HP",
            transmission: "6-Speed Dual-Clutch",
            seats: "4"
        },
        price: 2700000,
        available: 10,
        featured: false
    },
    {
        id: 4,
        name: "Audi RS7 Sportback",
        type: "family",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            power: "591 HP",
            transmission: "8-Speed Tiptronic",
            seats: "5"
        },
        price: 3200000,
        available: 10,
        featured: true
    },
    {
        id: 5,
        name: "Mercedes-AMG GT 4-Door",
        type: "family",
        image: "https://images.unsplash.com/photo-1626668893636-864b990f0c08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Biturbo",
            power: "630 HP",
            transmission: "9-Speed AMG Speedshift",
            seats: "5"
        },
        price: 3800000,
        available: 10,
        featured: true
    },
    {
        id: 6,
        name: "Porsche Panamera Turbo",
        type: "family",
        image: "https://images.unsplash.com/photo-1603587074812-3247b802bc53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            power: "620 HP",
            transmission: "8-Speed PDK",
            seats: "4"
        },
        price: 4200000,
        available: 10,
        featured: false
    },
    {
        id: 7,
        name: "BMW M5 Competition",
        type: "family",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "4.4L V8 Twin-Turbo",
            power: "617 HP",
            transmission: "8-Speed M Steptronic",
            seats: "5"
        },
        price: 2900000,
        available: 10,
        featured: false
    },
    {
        id: 8,
        name: "Audi RS6 Avant",
        type: "family",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            power: "591 HP",
            transmission: "8-Speed Tiptronic",
            seats: "5"
        },
        price: 3500000,
        available: 10,
        featured: true
    },
    {
        id: 9,
        name: "Mercedes-AMG E63 S",
        type: "family",
        image: "https://images.unsplash.com/photo-1563720223480-9fba7eed30e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Biturbo",
            power: "603 HP",
            transmission: "9-Speed AMG Speedshift",
            seats: "5"
        },
        price: 3300000,
        available: 10,
        featured: false
    },
    {
        id: 10,
        name: "Lexus LC 500",
        type: "family",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "5.0L V8",
            power: "471 HP",
            transmission: "10-Speed Automatic",
            seats: "4"
        },
        price: 2600000,
        available: 10,
        featured: false
    },

    // Travel Cars (10 mobil)
    {
        id: 11,
        name: "Ferrari 488 Spider",
        type: "travel",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "3.9L V8 Twin-Turbo",
            power: "661 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 4500000,
        available: 10,
        featured: true
    },
    {
        id: 12,
        name: "Audi R8 Spyder",
        type: "travel",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "5.2L V10",
            power: "562 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 3500000,
        available: 10,
        featured: false
    },
    {
        id: 13,
        name: "Mercedes-AMG GT Roadster",
        type: "travel",
        image: "https://images.unsplash.com/photo-1563720223480-9fba7eed30e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Biturbo",
            power: "523 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 3200000,
        available: 10,
        featured: true
    },
    {
        id: 14,
        name: "Aston Martin DB11 Volante",
        type: "travel",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        specs: {
            engine: "5.2L V12 Twin-Turbo",
            power: "630 HP",
            transmission: "8-Speed Automatic",
            seats: "4"
        },
        price: 4800000,
        available: 10,
        featured: true
    },
    {
        id: 15,
        name: "Porsche 718 Boxster",
        type: "travel",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "4.0L Flat-6",
            power: "394 HP",
            transmission: "6-Speed Manual",
            seats: "2"
        },
        price: 2200000,
        available: 10,
        featured: false
    },
    {
        id: 16,
        name: "BMW Z4 M40i",
        type: "travel",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
        specs: {
            engine: "3.0L Inline-6 Turbo",
            power: "382 HP",
            transmission: "8-Speed Automatic",
            seats: "2"
        },
        price: 1800000,
        available: 10,
        featured: false
    },
    {
        id: 17,
        name: "Jaguar F-Type Convertible",
        type: "travel",
        image: "https://images.unsplash.com/photo-1627005087588-8c8350ae50a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "5.0L V8 Supercharged",
            power: "575 HP",
            transmission: "8-Speed Automatic",
            seats: "2"
        },
        price: 3100000,
        available: 10,
        featured: true
    },
    {
        id: 18,
        name: "Chevrolet Corvette Stingray",
        type: "travel",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "6.2L V8",
            power: "495 HP",
            transmission: "8-Speed Dual-Clutch",
            seats: "2"
        },
        price: 2800000,
        available: 10,
        featured: false
    },
    {
        id: 19,
        name: "McLaren 570S Spider",
        type: "travel",
        image: "https://images.unsplash.com/photo-1627005087588-8c8350ae50a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "3.8L V8 Twin-Turbo",
            power: "562 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 4200000,
        available: 10,
        featured: true
    },
    {
        id: 20,
        name: "Lamborghini Huracan Spyder",
        type: "travel",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "5.2L V10",
            power: "602 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 5200000,
        available: 10,
        featured: true
    },

    // Supercar (10 mobil)
    {
        id: 21,
        name: "Lamborghini Huracan",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "5.2L V10",
            power: "602 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 5000000,
        available: 10,
        featured: true
    },
    {
        id: 22,
        name: "McLaren 720S",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1627005087588-8c8350ae50a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "4.0L V8 Twin-Turbo",
            power: "710 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 6000000,
        available: 10,
        featured: true
    },
    {
        id: 23,
        name: "Ferrari F8 Tributo",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "3.9L V8 Twin-Turbo",
            power: "710 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 6500000,
        available: 10,
        featured: true
    },
    {
        id: 24,
        name: "Lamborghini Aventador",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "6.5L V12",
            power: "730 HP",
            transmission: "7-Speed ISR",
            seats: "2"
        },
        price: 8500000,
        available: 10,
        featured: true
    },
    {
        id: 25,
        name: "Bugatti Chiron",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1627005087588-8c8350ae50a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "8.0L Quad-Turbo W16",
            power: "1500 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 25000000,
        available: 10,
        featured: true
    },
    {
        id: 26,
        name: "Koenigsegg Jesko",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "5.0L Twin-Turbo V8",
            power: "1280 HP",
            transmission: "9-Speed Multi-Clutch",
            seats: "2"
        },
        price: 18000000,
        available: 10,
        featured: true
    },
    {
        id: 27,
        name: "Pagani Huayra",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "6.0L Twin-Turbo V12",
            power: "730 HP",
            transmission: "7-Speed Sequential",
            seats: "2"
        },
        price: 12000000,
        available: 10,
        featured: true
    },
    {
        id: 28,
        name: "Aston Martin Valkyrie",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        specs: {
            engine: "6.5L V12 Hybrid",
            power: "1160 HP",
            transmission: "7-Speed Sequential",
            seats: "2"
        },
        price: 15000000,
        available: 10,
        featured: true
    },
    {
        id: 29,
        name: "McLaren P1",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1627005087588-8c8350ae50a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        specs: {
            engine: "3.8L V8 Twin-Turbo Hybrid",
            power: "903 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 9500000,
        available: 10,
        featured: true
    },
    {
        id: 30,
        name: "Ferrari LaFerrari",
        type: "supercar",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        specs: {
            engine: "6.3L V12 Hybrid",
            power: "950 HP",
            transmission: "7-Speed Dual-Clutch",
            seats: "2"
        },
        price: 11000000,
        available: 10,
        featured: true
    }
];

// DOM Elements
const carsContainer = document.getElementById('cars-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const carSelect = document.getElementById('car-select');
const pickupDate = document.getElementById('pickup-date');
const returnDate = document.getElementById('return-date');
const calculatePriceBtn = document.getElementById('calculate-price');
const priceResult = document.getElementById('price-result');
const confirmBookingBtn = document.getElementById('confirm-booking');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contactForm');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const customerName = document.getElementById('customer-name');
const customerPhone = document.getElementById('customer-phone');
const rentalDays = document.getElementById('rental-days');
const pickupLocation = document.getElementById('pickup-location');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for pickup to today
    const today = new Date().toISOString().split('T')[0];
    pickupDate.min = today;
    
    // Load cars
    displayCars(carsData);
    
    // Populate car select dropdown
    populateCarSelect();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Setup event listeners
    setupEventListeners();
});

// Display cars in the grid
function displayCars(cars) {
    carsContainer.innerHTML = '';
    
    if (cars.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">Tidak ada mobil yang sesuai dengan filter.</p>';
        return;
    }
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-type', car.type);
        
        carCard.innerHTML = `
            <div class="car-badge">${car.available} Unit Tersedia</div>
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.specs.power}</span>
                    <span><i class="fas fa-cogs"></i> ${car.specs.transmission}</span>
                    <span><i class="fas fa-user"></i> ${car.specs.seats}</span>
                </div>
                <div class="car-price">
                    <span class="price">Rp ${car.price.toLocaleString('id-ID')}/hari</span>
                    <button class="btn-primary select-car" data-id="${car.id}">Pilih</button>
                </div>
            </div>
        `;
        
        carsContainer.appendChild(carCard);
    });
    
    // Add event listeners to select buttons
    document.querySelectorAll('.select-car').forEach(button => {
        button.addEventListener('click', function() {
            const carId = parseInt(this.getAttribute('data-id'));
            selectCarForBooking(carId);
        });
    });
}

// Populate car select dropdown
function populateCarSelect() {
    carSelect.innerHTML = '<option value="">-- Pilih Mobil --</option>';
    
    carsData.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.name} (${car.available} unit tersedia)`;
        carSelect.appendChild(option);
    });
}

// Filter cars by type
function filterCars(type) {
    if (type === 'all') {
        displayCars(carsData);
    } else {
        const filteredCars = carsData.filter(car => car.type === type);
        displayCars(filteredCars);
    }
}

// Select car for booking
function selectCarForBooking(carId) {
    carSelect.value = carId;
    
    // Scroll to booking section
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
    });
}

// Calculate rental price
function calculatePrice() {
    const selectedCarId = parseInt(carSelect.value);
    const days = parseInt(rentalDays.value) || 1;
    
    // Validation
    if (!selectedCarId) {
        alert('Silakan pilih mobil terlebih dahulu.');
        return;
    }
    
    if (!customerName.value) {
        alert('Silakan masukkan nama lengkap.');
        return;
    }
    
    if (!customerPhone.value) {
        alert('Silakan masukkan nomor WhatsApp.');
        return;
    }
    
    if (days < 1) {
        alert('Lama sewa minimal 1 hari.');
        return;
    }
    
    // Find selected car
    const selectedCar = carsData.find(car => car.id === selectedCarId);
    
    // Calculate total price
    const totalPrice = selectedCar.price * days;
    
    // Display result
    priceResult.innerHTML = `
        <h3>Rincian Booking</h3>
        <p>Mobil: <strong>${selectedCar.name}</strong></p>
        <p>Lama Sewa: <strong>${days} hari</strong></p>
        <p>Lokasi Pengambilan: <strong>${getLocationName(pickupLocation.value)}</strong></p>
        <p>Harga per hari: <strong>Rp ${selectedCar.price.toLocaleString('id-ID')}</strong></p>
        <p class="total-price">Total: <strong>Rp ${totalPrice.toLocaleString('id-ID')}</strong></p>
    `;
    
    priceResult.style.display = 'block';
    confirmBookingBtn.disabled = false;
}

// Get location name from value
function getLocationName(locationValue) {
    const locations = {
        'jakarta': 'Jakarta',
        'bandung': 'Bandung',
        'bogor': 'Bogor',
        'depok': 'Depok',
        'bekasi': 'Bekasi',
        'semarang': 'Semarang',
        'solo': 'Solo',
        'yogyakarta': 'Yogyakarta',
        'magelang': 'Magelang',
        'pekalongan': 'Pekalongan',
        'surabaya': 'Surabaya',
        'malang': 'Malang',
        'sidoarjo': 'Sidoarjo',
        'kediri': 'Kediri',
        'jember': 'Jember',
        'bali': 'Bali',
        'lombok': 'Lombok',
        'medan': 'Medan',
        'palembang': 'Palembang',
        'makassar': 'Makassar'
    };
    
    return locations[locationValue] || locationValue;
}

// Send booking to WhatsApp
function sendWhatsAppBooking() {
    const selectedCarId = parseInt(carSelect.value);
    const selectedCar = carsData.find(car => car.id === selectedCarId);
    const days = parseInt(rentalDays.value) || 1;
    const totalPrice = selectedCar.price * days;
    
    // Create WhatsApp message
    const message = `Halo SportCar Rentals, saya ingin booking mobil:

Mobil: ${selectedCar.name}
Lama Sewa: ${days} hari
Lokasi Pengambilan: ${getLocationName(pickupLocation.value)}
Nama: ${customerName.value}
Telepon: ${customerPhone.value}
Total Harga: Rp ${totalPrice.toLocaleString('id-ID')}

Apakah mobil tersedia untuk tanggal tersebut?`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp API URL with the provided number
    const whatsappUrl = `https://wa.me/6285136236798?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    resetBookingForm();
    
    // Show confirmation
    alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk konfirmasi booking.');
}

// Reset booking form
function resetBookingForm() {
    carSelect.value = '';
    pickupDate.value = '';
    returnDate.value = '';
    customerName.value = '';
    customerPhone.value = '';
    rentalDays.value = '1';
    pickupLocation.value = 'jakarta';
    priceResult.style.display = 'none';
    confirmBookingBtn.disabled = true;
}

// Testimonial slider
function initTestimonialSlider() {
    let currentTestimonial = 0;
    
    // Auto rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Dot click events
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial
    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter cars
            const filter = this.getAttribute('data-filter');
            filterCars(filter);
        });
    });
    
    // Car select change
    carSelect.addEventListener('change', function() {
        if (this.value) {
            const carId = parseInt(this.value);
            selectCarForBooking(carId);
        }
    });
    
    // Calculate price button
    calculatePriceBtn.addEventListener('click', calculatePrice);
    
    // Confirm booking button (WhatsApp)
    confirmBookingBtn.addEventListener('click', sendWhatsAppBooking);
    
    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
        this.reset();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Filter links in footer
    document.querySelectorAll('.footer-section a[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === filter) {
                    btn.click();
                }
            });
            
            // Scroll to cars section
            document.getElementById('cars').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Update return date min based on pickup date
    pickupDate.addEventListener('change', function() {
        if (this.value) {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            returnDate.min = nextDay.toISOString().split('T')[0];
            
            // If return date is before new min, clear it
            if (returnDate.value && new Date(returnDate.value) < nextDay) {
                returnDate.value = '';
            }
            
            // Calculate days if both dates are set
            if (returnDate.value) {
                const pickup = new Date(this.value);
                const returnD = new Date(returnDate.value);
                const timeDiff = returnD.getTime() - pickup.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                rentalDays.value = daysDiff;
            }
        }
    });
    
    // Update return date when rental days change
    rentalDays.addEventListener('change', function() {
        const days = parseInt(this.value) || 1;
        if (pickupDate.value) {
            const returnD = new Date(pickupDate.value);
            returnD.setDate(returnD.getDate() + days);
            returnDate.value = returnD.toISOString().split('T')[0];
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
