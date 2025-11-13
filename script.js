// script.js - VERSION DENGAN FIREBASE

// DOM Elements
const carsContainer = document.getElementById('cars-container');
const recommendedCarsContainer = document.getElementById('recommended-cars');
const filterButtons = document.querySelectorAll('.filter-btn');
const carSelect = document.getElementById('car-select');
const vehicleType = document.getElementById('vehicle-type');
const pickupDate = document.getElementById('pickup-date');
const returnDate = document.getElementById('return-date');
const calculatePriceBtn = document.getElementById('calculate-price');
const priceResult = document.getElementById('price-result');
const confirmBookingBtn = document.getElementById('confirm-booking');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const contactForm = document.getElementById('contactForm');
const reviewForm = document.getElementById('reviewForm');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const customerName = document.getElementById('customer-name');
const customerPhone = document.getElementById('customer-phone');
const rentalDays = document.getElementById('rental-days');
const pickupLocation = document.getElementById('pickup-location');
const promoCode = document.getElementById('promo-code');
const applyPromoBtn = document.getElementById('apply-promo');
const promoMessage = document.getElementById('promo-message');
const themeSwitch = document.getElementById('theme-switch');
const scrollToTopBtn = document.getElementById('scrollToTop');
const reviewVehicle = document.getElementById('review-vehicle');
const reviewStars = document.querySelectorAll('.stars i');

// State variables
let currentPromo = null;
let currentDiscount = 0;
let selectedRating = 0;

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

// Data promo dan diskon
const promoCodes = {
    "WEEKEND20": { discount: 20, validUntil: "2023-12-31", type: "percentage" },
    "NEWUSER15": { discount: 15, validUntil: "2023-11-30", type: "percentage" },
    "LONGTERM25": { discount: 25, validUntil: "2023-12-31", type: "percentage" },
    "WELCOME10": { discount: 10, validUntil: "2024-01-31", type: "percentage" }
};

// Data testimoni
let testimonials = [
    {
        id: 1,
        name: "Andi Wijaya",
        location: "Jakarta",
        rating: 5,
        message: "Pengalaman menyewa Porsche 911 sangat memuaskan. Mobil dalam kondisi prima dan prosesnya cepat. Akan sewa lagi!",
        vehicle: "Porsche 911 Carrera",
        date: "2023-10-15",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 2,
        name: "Sarah Putri",
        location: "Bandung",
        rating: 4.5,
        message: "Layanan delivery sangat membantu. Ferrari 488 diantarkan tepat waktu dan sesuai ekspektasi. Recommended!",
        vehicle: "Ferrari 488 Spider",
        date: "2023-10-10",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 3,
        name: "Rizky Pratama",
        location: "Surabaya",
        rating: 5,
        message: "Harga kompetitif dengan kondisi mobil yang sangat baik. Proses booking mudah dan staff sangat membantu.",
        vehicle: "Lamborghini Huracan",
        date: "2023-10-05",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg"
    }
];

// ==================== FIREBASE INTEGRATION ====================

// Auth state management
function updateAuthUI(user) {
    const authElements = document.querySelectorAll('.auth-element');
    const adminAccess = document.querySelector('.admin-access');
    
    if (user) {
        // User logged in
        authElements.forEach(el => {
            el.style.display = 'none';
        });
        
        if (adminAccess) {
            adminAccess.innerHTML = `
                <span>Halo, ${user.email}</span>
                <button onclick="rentalService.logout()" class="btn-secondary">Logout</button>
            `;
        }
    } else {
        // User not logged in
        authElements.forEach(el => {
            el.style.display = 'block';
        });
        
        if (adminAccess) {
            adminAccess.innerHTML = `
                <a href="#login" class="auth-element">Login</a>
                <a href="#register" class="auth-element">Register</a>
            `;
        }
    }
}

// Initialize the page dengan Firebase
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Initializing website with Firebase...');
    
    // Set minimum date for pickup to today
    const today = new Date().toISOString().split('T')[0];
    pickupDate.min = today;
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // ==================== FIREBASE INITIALIZATION ====================
    try {
        // Cek jika Firebase tersedia
        if (typeof rentalService !== 'undefined') {
            await rentalService.loadCars();
            await rentalService.loadReviews();
            
            console.log('Firebase data loaded successfully');
            
            // Setup auth state listener
            if (typeof auth !== 'undefined') {
                auth.onAuthStateChanged((user) => {
                    console.log('Auth state changed:', user);
                    if (typeof rentalService !== 'undefined') {
                        rentalService.currentUser = user;
                    }
                    updateAuthUI(user);
                });
            }
        } else {
            console.log('Firebase not available, using local data');
            displayCars(carsData);
            displayRecommendedCars();
        }
        
    } catch (error) {
        console.error('Firebase initialization error:', error);
        // Fallback ke data lokal
        displayCars(carsData);
        displayRecommendedCars();
    }
    
    // Populate car select dropdown
    populateCarSelect();
    
    // Populate review vehicle dropdown
    populateReviewVehicle();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Load saved theme
    loadTheme();
    
    // Setup event listeners
    setupEventListeners();
});

// ==================== EXISTING FUNCTIONS (DIMODIFIKASI) ====================

// Display cars in the grid
function displayCars(cars) {
    if (!carsContainer) return;
    
    carsContainer.innerHTML = '';
    
    if (cars.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">Tidak ada mobil yang sesuai dengan filter.</p>';
        return;
    }
    
    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.setAttribute('data-type', car.type || car.category);
        carCard.setAttribute('data-aos', 'fade-up');
        
        carCard.innerHTML = `
            <div class="car-badge">${car.available} Unit Tersedia</div>
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70'">
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
            const carId = this.getAttribute('data-id');
            selectCarForBooking(carId);
        });
    });
}

// Display recommended cars
function displayRecommendedCars() {
    if (!recommendedCarsContainer) return;
    
    // Gunakan data dari Firebase jika ada, atau data lokal
    const carsToUse = (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) 
        ? rentalService.cars 
        : carsData;
    
    // Get top 3 most rented cars
    const recommended = [...carsToUse]
        .sort((a, b) => (b.rentalCount || 0) - (a.rentalCount || 0))
        .slice(0, 3);
    
    recommendedCarsContainer.innerHTML = '';
    
    recommended.forEach(car => {
        const recommendedCar = document.createElement('div');
        recommendedCar.className = 'recommended-car';
        
        recommendedCar.innerHTML = `
            <h4>${car.name}</h4>
            <p>${car.specs.power} • ${car.specs.seats} Seat</p>
            <div class="price">Rp ${car.price.toLocaleString('id-ID')}/hari</div>
            <small>${car.rentalCount || 0}x disewa</small>
        `;
        
        recommendedCarsContainer.appendChild(recommendedCar);
    });
}

// Populate car select dropdown
function populateCarSelect() {
    if (!carSelect) return;
    
    carSelect.innerHTML = '<option value="">-- Pilih Mobil --</option>';
    
    // Gunakan data dari Firebase jika ada, atau data lokal
    const carsToUse = (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) 
        ? rentalService.cars 
        : carsData;
    
    if (carsToUse && carsToUse.length > 0) {
        carsToUse.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = `${car.name} (${car.available} unit tersedia)`;
            carSelect.appendChild(option);
        });
    }
}

// Populate review vehicle dropdown
function populateReviewVehicle() {
    if (!reviewVehicle) return;
    
    reviewVehicle.innerHTML = '<option value="">-- Pilih Kendaraan --</option>';
    
    // Gunakan data dari Firebase jika ada, atau data lokal
    const carsToUse = (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) 
        ? rentalService.cars 
        : carsData;
    
    if (carsToUse && carsToUse.length > 0) {
        carsToUse.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = car.name;
            reviewVehicle.appendChild(option);
        });
    }
}

// Filter cars by type
function filterCars(type) {
    // Gunakan data dari Firebase jika ada, atau data lokal
    const carsToUse = (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) 
        ? rentalService.cars 
        : carsData;
    
    if (type === 'all') {
        displayCars(carsToUse);
    } else {
        const filteredCars = carsToUse.filter(car => (car.type || car.category) === type);
        displayCars(filteredCars);
    }
}

// Select car for booking
function selectCarForBooking(carId) {
    carSelect.value = carId;
    vehicleType.value = 'car';
    
    document.getElementById('booking').scrollIntoView({
        behavior: 'smooth'
    });
}

// Apply promo code
function applyPromoCode() {
    const code = promoCode.value.trim().toUpperCase();
    promoMessage.textContent = '';
    promoMessage.className = 'promo-message';
    
    if (!code) {
        promoMessage.textContent = 'Masukkan kode promo';
        promoMessage.className = 'promo-message error';
        return;
    }
    
    if (promoCodes[code]) {
        const promo = promoCodes[code];
        const today = new Date();
        const validUntil = new Date(promo.validUntil);
        
        if (today <= validUntil) {
            currentPromo = code;
            currentDiscount = promo.discount;
            promoMessage.textContent = `Promo berhasil digunakan! Diskon ${promo.discount}%`;
            promoMessage.className = 'promo-message success';
        } else {
            promoMessage.textContent = 'Kode promo sudah kedaluwarsa';
            promoMessage.className = 'promo-message error';
        }
    } else {
        promoMessage.textContent = 'Kode promo tidak valid';
        promoMessage.className = 'promo-message error';
    }
}

// Calculate rental price
function calculatePrice() {
    const selectedVehicleType = vehicleType.value;
    let selectedCarId, basePrice, vehicleName;
    
    // Validation
    if (!selectedVehicleType) {
        alert('Silakan pilih jenis kendaraan terlebih dahulu.');
        return;
    }
    
    if (selectedVehicleType === 'car') {
        selectedCarId = parseInt(carSelect.value);
        if (!selectedCarId) {
            alert('Silakan pilih mobil terlebih dahulu.');
            return;
        }
        
        // Cari mobil dari Firebase atau data lokal
        let selectedCar;
        if (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) {
            selectedCar = rentalService.cars.find(car => car.id === selectedCarId);
        } else {
            selectedCar = carsData.find(car => car.id === selectedCarId);
        }
        
        if (!selectedCar) {
            alert('Mobil tidak ditemukan.');
            return;
        }
        basePrice = selectedCar.price;
        vehicleName = selectedCar.name;
    } else {
        // Bus prices
        const busPrices = {
            'bus-small': 1200000,
            'bus-medium': 1800000,
            'bus-large': 2500000,
            'bus-sleeper': 4000000
        };
        
        const busNames = {
            'bus-small': 'Bus Kecil (15-20 Seat)',
            'bus-medium': 'Bus Medium (25-30 Seat)',
            'bus-large': 'Bus Besar (40-45 Seat)',
            'bus-sleeper': 'Sleeper Bus VVIP'
        };
        
        basePrice = busPrices[selectedVehicleType];
        vehicleName = busNames[selectedVehicleType];
    }
    
    if (!customerName.value) {
        alert('Silakan masukkan nama lengkap.');
        return;
    }
    
    if (!customerPhone.value) {
        alert('Silakan masukkan nomor WhatsApp.');
        return;
    }
    
    const days = parseInt(rentalDays.value) || 1;
    if (days < 1) {
        alert('Lama sewa minimal 1 hari.');
        return;
    }
    
    // Calculate total price
    let totalPrice = basePrice * days;
    let discountAmount = 0;
    
    if (currentPromo) {
        discountAmount = (totalPrice * currentDiscount) / 100;
        totalPrice -= discountAmount;
    }
    
    // Display result
    priceResult.innerHTML = `
        <h3>Rincian Booking</h3>
        <p>Kendaraan: <strong>${vehicleName}</strong></p>
        <p>Lama Sewa: <strong>${days} hari</strong></p>
        <p>Lokasi Pengambilan: <strong>${getLocationName(pickupLocation.value)}</strong></p>
        <p>Harga per hari: <strong>Rp ${basePrice.toLocaleString('id-ID')}</strong></p>
        ${currentPromo ? `
            <p class="discount-price">Diskon ${currentDiscount}%: -Rp ${discountAmount.toLocaleString('id-ID')}</p>
            <p>Kode Promo: <strong>${currentPromo}</strong></p>
        ` : ''}
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

// Send booking to WhatsApp - DIUBAH untuk Firebase
async function sendWhatsAppBooking() {
    const selectedVehicleType = vehicleType.value;
    let selectedCarId, basePrice, vehicleName;
    
    if (selectedVehicleType === 'car') {
        selectedCarId = carSelect.value;
        if (!selectedCarId) {
            alert('Silakan pilih mobil terlebih dahulu.');
            return;
        }
        
        // Cari mobil dari Firebase atau data lokal
        let selectedCar;
        if (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) {
            selectedCar = rentalService.cars.find(car => car.id === selectedCarId);
        } else {
            selectedCar = carsData.find(car => car.id === parseInt(selectedCarId));
        }
        
        if (!selectedCar) {
            alert('Mobil tidak ditemukan.');
            return;
        }
        vehicleName = selectedCar.name;
        basePrice = selectedCar.price;
    } else {
        // Handle bus booking
        const busPrices = {
            'bus-small': 1200000,
            'bus-medium': 1800000,
            'bus-large': 2500000,
            'bus-sleeper': 4000000
        };
        
        const busNames = {
            'bus-small': 'Bus Kecil (15-20 Seat)',
            'bus-medium': 'Bus Medium (25-30 Seat)',
            'bus-large': 'Bus Besar (40-45 Seat)',
            'bus-sleeper': 'Sleeper Bus VVIP'
        };
        
        basePrice = busPrices[selectedVehicleType];
        vehicleName = busNames[selectedVehicleType];
        selectedCarId = selectedVehicleType;
    }
    
    if (!customerName.value) {
        alert('Silakan masukkan nama lengkap.');
        return;
    }
    
    if (!customerPhone.value) {
        alert('Silakan masukkan nomor WhatsApp.');
        return;
    }
    
    const days = parseInt(rentalDays.value) || 1;
    if (days < 1) {
        alert('Lama sewa minimal 1 hari.');
        return;
    }
    
    // Calculate total price
    let totalPrice = basePrice * days;
    let discountAmount = 0;
    
    if (currentPromo) {
        discountAmount = (totalPrice * currentDiscount) / 100;
        totalPrice -= discountAmount;
    }
    
    // Create booking data
    const bookingData = {
        customerName: customerName.value,
        customerPhone: customerPhone.value,
        carName: vehicleName,
        carId: selectedCarId,
        pickupDate: pickupDate.value,
        returnDate: returnDate.value,
        pickupLocation: pickupLocation.value,
        totalPrice: totalPrice,
        days: days,
        promoCode: currentPromo || '',
        discount: currentDiscount || 0,
        vehicleType: selectedVehicleType
    };
    
    // Show loading state
    confirmBookingBtn.disabled = true;
    confirmBookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    
    try {
        // Jika Firebase tersedia, gunakan service Firebase
        if (typeof rentalService !== 'undefined' && typeof rentalService.createBooking === 'function') {
            const result = await rentalService.createBooking(bookingData);
            
            if (result.success) {
                alert(`Booking berhasil! Kode booking: ${result.bookingCode}`);
                resetBookingForm();
            } else {
                alert(`Booking gagal: ${result.error}`);
            }
        } else {
            // Fallback ke WhatsApp langsung (tanpa Firebase)
            sendWhatsAppDirect(bookingData, totalPrice);
        }
    } catch (error) {
        console.error('Booking error:', error);
        // Fallback ke WhatsApp langsung
        sendWhatsAppDirect(bookingData, totalPrice);
    }
    
    // Reset button state
    confirmBookingBtn.disabled = false;
    confirmBookingBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Booking via WhatsApp';
}

// Fallback WhatsApp function (tanpa Firebase)
function sendWhatsAppDirect(bookingData, totalPrice) {
    const message = `Halo LowRen Car's, saya ingin booking kendaraan:

Kendaraan: ${bookingData.carName}
Lama Sewa: ${bookingData.days} hari
Lokasi Pengambilan: ${getLocationName(bookingData.pickupLocation)}
Nama: ${bookingData.customerName}
Telepon: ${bookingData.customerPhone}
${bookingData.promoCode ? `Kode Promo: ${bookingData.promoCode} (Diskon ${bookingData.discount}%)` : ''}
Total Harga: Rp ${totalPrice.toLocaleString('id-ID')}

Apakah kendaraan tersedia untuk tanggal tersebut?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285136236798?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    alert('Booking berhasil! Silakan konfirmasi via WhatsApp.');
    resetBookingForm();
}

// Reset booking form
function resetBookingForm() {
    vehicleType.value = '';
    carSelect.value = '';
    pickupDate.value = '';
    returnDate.value = '';
    customerName.value = '';
    customerPhone.value = '';
    rentalDays.value = '1';
    pickupLocation.value = 'jakarta';
    promoCode.value = '';
    currentPromo = null;
    currentDiscount = 0;
    promoMessage.textContent = '';
    priceResult.style.display = 'none';
    confirmBookingBtn.disabled = true;
}

// Submit review - DIUBAH untuk Firebase
async function submitReview(e) {
    e.preventDefault();
    
    const name = document.getElementById('review-name').value;
    const email = document.getElementById('review-email').value;
    const vehicleId = reviewVehicle.value;
    const message = document.getElementById('review-message').value;
    
    if (!name || !email || !vehicleId || !selectedRating || !message) {
        alert('Harap lengkapi semua field dan berikan rating.');
        return;
    }
    
    // Cari data kendaraan dari Firebase atau data lokal
    let vehicle;
    if (typeof rentalService !== 'undefined' && rentalService.cars && rentalService.cars.length > 0) {
        vehicle = rentalService.cars.find(car => car.id === vehicleId);
    } else {
        vehicle = carsData.find(car => car.id === parseInt(vehicleId));
    }
    
    const reviewData = {
        name: name,
        email: email,
        vehicle: vehicle ? vehicle.name : 'Kendaraan Lain',
        rating: selectedRating,
        message: message,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    try {
        // Jika Firebase tersedia, gunakan service Firebase
        if (typeof rentalService !== 'undefined' && typeof rentalService.submitReview === 'function') {
            const result = await rentalService.submitReview(reviewData);
            
            if (result.success) {
                alert('Terima kasih atas review Anda! Review akan ditampilkan setelah moderasi.');
                reviewForm.reset();
                resetStarRating();
            } else {
                alert('Gagal mengirim review: ' + result.error);
            }
        } else {
            // Fallback: simpan di local storage atau tampilkan pesan
            alert('Terima kasih atas review Anda! (Mode demo)');
            reviewForm.reset();
            resetStarRating();
        }
    } catch (error) {
        console.error('Review submission error:', error);
        alert('Terima kasih atas review Anda! (Mode demo)');
        reviewForm.reset();
        resetStarRating();
    }
}

// ==================== TANPA PERUBAHAN (Fungsi yang tetap sama) ====================

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

// Star rating functionality
function setupStarRating() {
    reviewStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectedRating = rating;
            
            reviewStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            reviewStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Reset stars on mouse leave
    document.querySelector('.stars').addEventListener('mouseleave', function() {
        if (selectedRating === 0) {
            resetStarRating();
        } else {
            reviewStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        }
    });
}

function resetStarRating() {
    reviewStars.forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
    });
    selectedRating = 0;
}

// Theme functionality
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
    if (themeSwitch) {
        themeSwitch.checked = savedTheme === 'dark-mode';
    }
}

function toggleTheme() {
    if (themeSwitch.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
}

// Scroll to top functionality
function handleScroll() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Copy promo code
function copyPromoCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`Kode promo "${code}" berhasil disalin!`);
    });
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
    
    // Vehicle type change
    if (vehicleType) {
        vehicleType.addEventListener('change', function() {
            const carSelectGroup = document.getElementById('car-select-group');
            if (carSelectGroup) {
                if (this.value === 'car') {
                    carSelectGroup.style.display = 'block';
                } else {
                    carSelectGroup.style.display = 'none';
                }
            }
        });
    }
    
    // Car select change
    if (carSelect) {
        carSelect.addEventListener('change', function() {
            if (this.value) {
                const carId = this.value;
                selectCarForBooking(carId);
            }
        });
    }
    
    // Bus select buttons
    document.querySelectorAll('.select-bus').forEach(button => {
        button.addEventListener('click', function() {
            const busType = this.getAttribute('data-type');
            if (vehicleType) {
                vehicleType.value = `bus-${busType}`;
            }
            
            // Hide car select
            const carSelectGroup = document.getElementById('car-select-group');
            if (carSelectGroup) {
                carSelectGroup.style.display = 'none';
            }
            
            // Scroll to booking section
            document.getElementById('booking').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Apply promo button
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
    
    // Calculate price button
    if (calculatePriceBtn) {
        calculatePriceBtn.addEventListener('click', calculatePrice);
    }
    
    // Confirm booking button (WhatsApp)
    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', sendWhatsAppBooking);
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
            this.reset();
        });
    }
    
    // Review form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
    
    // Star rating
    setupStarRating();
    
    // Theme toggle
    if (themeSwitch) {
        themeSwitch.addEventListener('change', toggleTheme);
    }
    
    // Scroll to top
    window.addEventListener('scroll', handleScroll);
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Copy promo code buttons
    document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', function() {
            const code = this.getAttribute('data-code');
            copyPromoCode(code);
        });
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
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
    if (pickupDate) {
        pickupDate.addEventListener('change', function() {
            if (this.value) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                if (returnDate) {
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
                        if (rentalDays) {
                            rentalDays.value = daysDiff;
                        }
                    }
                }
            }
        });
    }
    
    // Update return date when rental days change
    if (rentalDays) {
        rentalDays.addEventListener('change', function() {
            const days = parseInt(this.value) || 1;
            if (pickupDate && pickupDate.value) {
                const returnD = new Date(pickupDate.value);
                returnD.setDate(returnD.getDate() + days);
                if (returnDate) {
                    returnDate.value = returnD.toISOString().split('T')[0];
                }
            }
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            
            if (document.body.classList.contains('dark-mode')) {
                header.style.backgroundColor = 'rgba(45, 52, 54, 0.98)';
            }
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            
            if (document.body.classList.contains('dark-mode')) {
                header.style.backgroundColor = 'rgba(45, 52, 54, 0.95)';
            }
        }
    }
});

// Cleanup ketika page unload
window.addEventListener('beforeunload', function() {
    if (typeof rentalService !== 'undefined' && typeof rentalService.cleanup === 'function') {
        rentalService.cleanup();
    }
});
