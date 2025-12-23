// Gallery System for The Aviator Property
// Handles filtering, view all expansion, and lightbox functionality

// ==================== ALL IMAGES DATA ====================
const allImagesData = [
    // Aerials (10 images)
    { filename: 'Aerials-1.jpg', category: 'exterior', title: 'Aerial View 1' },
    { filename: 'Aerials-2.jpg', category: 'exterior', title: 'Aerial View 2' },
    { filename: 'Aerials-3.jpg', category: 'exterior', title: 'Aerial View 3' },
    { filename: 'Aerials-4.jpg', category: 'exterior', title: 'Aerial View 4' },
    { filename: 'Aerials-5.jpg', category: 'exterior', title: 'Aerial View 5' },
    { filename: 'Aerials-6.jpg', category: 'exterior', title: 'Aerial View 6' },
    { filename: 'Aerials-7.jpg', category: 'exterior', title: 'Aerial View 7' },
    { filename: 'Aerials-8.jpg', category: 'exterior', title: 'Aerial View 8' },
    { filename: 'Aerials-9.jpg', category: 'exterior', title: 'Aerial View 9' },
    { filename: 'Aerials-10.jpg', category: 'exterior', title: 'Aerial View 10' },

    // Exterior Afternoon (24 images)
    { filename: 'aExterior Afternoon2.jpg', category: 'exterior', title: 'Afternoon Exterior 2' },
    { filename: 'aExterior Afternoon3.jpg', category: 'exterior', title: 'Afternoon Exterior 3' },
    { filename: 'aExterior Afternoon4.jpg', category: 'exterior', title: 'Afternoon Exterior 4' },
    { filename: 'aExterior Afternoon5.jpg', category: 'exterior', title: 'Afternoon Exterior 5' },
    { filename: 'aExterior Afternoon6.jpg', category: 'exterior', title: 'Afternoon Exterior 6' },
    { filename: 'aExterior Afternoon7.jpg', category: 'exterior', title: 'Afternoon Exterior 7' },
    { filename: 'aExterior Afternoon8.jpg', category: 'exterior', title: 'Afternoon Exterior 8' },
    { filename: 'aExterior Afternoon9.jpg', category: 'exterior', title: 'Afternoon Exterior 9' },
    { filename: 'aExterior Afternoon10.jpg', category: 'exterior', title: 'Afternoon Exterior 10' },
    { filename: 'aExterior Afternoon11.jpg', category: 'exterior', title: 'Afternoon Exterior 11' },
    { filename: 'aExterior Afternoon12.jpg', category: 'exterior', title: 'Afternoon Exterior 12' },
    { filename: 'aExterior Afternoon13.jpg', category: 'exterior', title: 'Afternoon Exterior 13' },
    { filename: 'aExterior Afternoon14.jpg', category: 'exterior', title: 'Afternoon Exterior 14' },
    { filename: 'aExterior Afternoon15.jpg', category: 'exterior', title: 'Afternoon Exterior 15' },
    { filename: 'aExterior Afternoon16.jpg', category: 'exterior', title: 'Afternoon Exterior 16' },
    { filename: 'aExterior Afternoon17.jpg', category: 'exterior', title: 'Afternoon Exterior 17' },
    { filename: 'aExterior Afternoon18.jpg', category: 'exterior', title: 'Afternoon Exterior 18' },
    { filename: 'aExterior Afternoon19.jpg', category: 'exterior', title: 'Afternoon Exterior 19' },
    { filename: 'aExterior Afternoon20.jpg', category: 'exterior', title: 'Afternoon Exterior 20' },
    { filename: 'aExterior Afternoon21.jpg', category: 'exterior', title: 'Afternoon Exterior 21' },
    { filename: 'aExterior Afternoon22.jpg', category: 'exterior', title: 'Afternoon Exterior 22' },
    { filename: 'aExterior Afternoon23.jpg', category: 'exterior', title: 'Afternoon Exterior 23' },
    { filename: 'aExterior Afternoon24.jpg', category: 'exterior', title: 'Afternoon Exterior 24' },

    // Exterior Dusk (25 images)
    { filename: 'bExterior Dusk2.jpg', category: 'exterior', title: 'Dusk Exterior 2' },
    { filename: 'bExterior Dusk3.jpg', category: 'exterior', title: 'Dusk Exterior 3' },
    { filename: 'bExterior Dusk4.jpg', category: 'exterior', title: 'Dusk Exterior 4' },
    { filename: 'bExterior Dusk5.jpg', category: 'exterior', title: 'Dusk Exterior 5' },
    { filename: 'bExterior Dusk6.jpg', category: 'exterior', title: 'Dusk Exterior 6' },
    { filename: 'bExterior Dusk7.jpg', category: 'exterior', title: 'Dusk Exterior 7' },
    { filename: 'bExterior Dusk8.jpg', category: 'exterior', title: 'Dusk Exterior 8' },
    { filename: 'bExterior Dusk9.jpg', category: 'exterior', title: 'Dusk Exterior 9' },
    { filename: 'bExterior Dusk10.jpg', category: 'exterior', title: 'Dusk Exterior 10' },
    { filename: 'bExterior Dusk11.jpg', category: 'exterior', title: 'Dusk Exterior 11' },
    { filename: 'bExterior Dusk12.jpg', category: 'exterior', title: 'Dusk Exterior 12' },
    { filename: 'bExterior Dusk13.jpg', category: 'exterior', title: 'Dusk Exterior 13' },
    { filename: 'bExterior Dusk14.jpg', category: 'exterior', title: 'Dusk Exterior 14' },
    { filename: 'bExterior Dusk15.jpg', category: 'exterior', title: 'Dusk Exterior 15' },
    { filename: 'bExterior Dusk16.jpg', category: 'exterior', title: 'Dusk Exterior 16' },
    { filename: 'bExterior Dusk17.jpg', category: 'exterior', title: 'Dusk Exterior 17' },
    { filename: 'bExterior Dusk18.jpg', category: 'exterior', title: 'Dusk Exterior 18' },
    { filename: 'bExterior Dusk19.jpg', category: 'exterior', title: 'Dusk Exterior 19' },
    { filename: 'bExterior Dusk20.jpg', category: 'exterior', title: 'Dusk Exterior 20' },
    { filename: 'bExterior Dusk21.jpg', category: 'exterior', title: 'Dusk Exterior 21' },
    { filename: 'bExterior Dusk22.jpg', category: 'exterior', title: 'Dusk Exterior 22' },
    { filename: 'bExterior Dusk23.jpg', category: 'exterior', title: 'Dusk Exterior 23' },
    { filename: 'bExterior Dusk24.jpg', category: 'exterior', title: 'Dusk Exterior 24' },
    { filename: 'bExterior Dusk25.jpg', category: 'exterior', title: 'Dusk Exterior 25' },

    // Entry and Living (8 images)
    { filename: 'cEntry and Living2.jpg', category: 'living', title: 'Entry & Living 2' },
    { filename: 'cEntry and Living3.jpg', category: 'living', title: 'Entry & Living 3' },
    { filename: 'cEntry and Living4.jpg', category: 'living', title: 'Entry & Living 4' },
    { filename: 'cEntry and Living5.jpg', category: 'living', title: 'Entry & Living 5' },
    { filename: 'cEntry and Living6.jpg', category: 'living', title: 'Entry & Living 6' },
    { filename: 'cEntry and Living7.jpg', category: 'living', title: 'Entry & Living 7' },
    { filename: 'cEntry and Living8.jpg', category: 'living', title: 'Entry & Living 8' },

    // Kitchen and Dining (12 images)
    { filename: 'dKitchen and Dining2.jpg', category: 'living', title: 'Kitchen & Dining 2' },
    { filename: 'dKitchen and Dining3.jpg', category: 'living', title: 'Kitchen & Dining 3' },
    { filename: 'dKitchen and Dining4.jpg', category: 'living', title: 'Kitchen & Dining 4' },
    { filename: 'dKitchen and Dining5.jpg', category: 'living', title: 'Kitchen & Dining 5' },
    { filename: 'dKitchen and Dining6.jpg', category: 'living', title: 'Kitchen & Dining 6' },
    { filename: 'dKitchen and Dining7.jpg', category: 'living', title: 'Kitchen & Dining 7' },
    { filename: 'dKitchen and Dining8.jpg', category: 'living', title: 'Kitchen & Dining 8' },
    { filename: 'dKitchen and Dining9.jpg', category: 'living', title: 'Kitchen & Dining 9' },
    { filename: 'dKitchen and Dining10.jpg', category: 'living', title: 'Kitchen & Dining 10' },
    { filename: 'dKitchen and Dining11.jpg', category: 'living', title: 'Kitchen & Dining 11' },
    { filename: 'dKitchen and Dining12.jpg', category: 'living', title: 'Kitchen & Dining 12' },

    // Powder (3 images)
    { filename: 'ePowder2.jpg', category: 'details', title: 'Powder Room 2' },
    { filename: 'ePowder3.jpg', category: 'details', title: 'Powder Room 3' },

    // Bedroom 1 (5 images)
    { filename: 'fBedroom1-2.jpg', category: 'bedrooms', title: 'Guest Bedroom 2' },
    { filename: 'fBedroom1-3.jpg', category: 'bedrooms', title: 'Guest Bedroom 3' },
    { filename: 'fBedroom1-4.jpg', category: 'bedrooms', title: 'Guest Bedroom 4' },
    { filename: 'fBedroom1-5.jpg', category: 'bedrooms', title: 'Guest Bedroom 5' },

    // Stairs and Landing (5 images)
    { filename: 'gStairs and Landing2.jpg', category: 'details', title: 'Stairs & Landing 2' },
    { filename: 'gStairs and Landing3.jpg', category: 'details', title: 'Stairs & Landing 3' },
    { filename: 'gStairs and Landing4.jpg', category: 'details', title: 'Stairs & Landing 4' },
    { filename: 'gStairs and Landing5.jpg', category: 'details', title: 'Stairs & Landing 5' },

    // Hidden Room (5 images)
    { filename: 'hHidden Room2.jpg', category: 'details', title: 'Hidden Room 2' },
    { filename: 'hHidden Room3.jpg', category: 'details', title: 'Hidden Room 3' },
    { filename: 'hHidden Room4.jpg', category: 'details', title: 'Hidden Room 4' },
    { filename: 'hHidden Room5.jpg', category: 'details', title: 'Hidden Room 5' },

    // Primary Bedroom Suite (18 images)
    { filename: 'iPrimary Bedroom Suite2.jpg', category: 'bedrooms', title: 'Primary Suite 2' },
    { filename: 'iPrimary Bedroom Suite3.jpg', category: 'bedrooms', title: 'Primary Suite 3' },
    { filename: 'iPrimary Bedroom Suite4.jpg', category: 'bedrooms', title: 'Primary Suite 4' },
    { filename: 'iPrimary Bedroom Suite5.jpg', category: 'bedrooms', title: 'Primary Suite 5' },
    { filename: 'iPrimary Bedroom Suite6.jpg', category: 'bedrooms', title: 'Primary Suite 6' },
    { filename: 'iPrimary Bedroom Suite7.jpg', category: 'bedrooms', title: 'Primary Suite 7' },
    { filename: 'iPrimary Bedroom Suite8.jpg', category: 'bedrooms', title: 'Primary Suite 8' },
    { filename: 'iPrimary Bedroom Suite9.jpg', category: 'bedrooms', title: 'Primary Suite 9' },
    { filename: 'iPrimary Bedroom Suite10.jpg', category: 'bedrooms', title: 'Primary Suite 10' },
    { filename: 'iPrimary Bedroom Suite11.jpg', category: 'bedrooms', title: 'Primary Suite 11' },
    { filename: 'iPrimary Bedroom Suite12.jpg', category: 'bedrooms', title: 'Primary Suite 12' },
    { filename: 'iPrimary Bedroom Suite13.jpg', category: 'bedrooms', title: 'Primary Suite 13' },
    { filename: 'iPrimary Bedroom Suite14.jpg', category: 'bedrooms', title: 'Primary Suite 14' },
    { filename: 'iPrimary Bedroom Suite15.jpg', category: 'bedrooms', title: 'Primary Suite 15' },
    { filename: 'iPrimary Bedroom Suite16.jpg', category: 'bedrooms', title: 'Primary Suite 16' },
    { filename: 'iPrimary Bedroom Suite17.jpg', category: 'bedrooms', title: 'Primary Suite 17' },
    { filename: 'iPrimary Bedroom Suite18.jpg', category: 'bedrooms', title: 'Primary Suite 18' },

    // Bedroom 3 Ensuite (17 images)
    { filename: 'jBedroom3 Ensuite1.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 1' },
    { filename: 'jBedroom3 Ensuite2.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 2' },
    { filename: 'jBedroom3 Ensuite3.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 3' },
    { filename: 'jBedroom3 Ensuite4.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 4' },
    { filename: 'jBedroom3 Ensuite5.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 5' },
    { filename: 'jBedroom3 Ensuite6.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 6' },
    { filename: 'jBedroom3 Ensuite7.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 7' },
    { filename: 'jBedroom3 Ensuite8.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 8' },
    { filename: 'jBedroom3 Ensuite9.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 9' },
    { filename: 'jBedroom3 Ensuite10.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 10' },
    { filename: 'jBedroom3 Ensuite11.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 11' },
    { filename: 'jBedroom3 Ensuite12.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 12' },
    { filename: 'jBedroom3 Ensuite13.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 13' },
    { filename: 'jBedroom3 Ensuite14.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 14' },
    { filename: 'jBedroom3 Ensuite15.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 15' },
    { filename: 'jBedroom3 Ensuite16.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 16' },
    { filename: 'jBedroom3 Ensuite17.jpg', category: 'bedrooms', title: 'Bedroom 3 Ensuite 17' },
];

// ==================== STATE ====================
let currentFilter = 'all';
let isExpanded = false;
let currentLightboxIndex = 0;
let filteredImages = [];

// ==================== DOM ELEMENTS ====================
const galleryGrid = document.getElementById('gallery-grid');
const viewAllBtn = document.getElementById('view-all-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// ==================== HELPER FUNCTIONS ====================

function getCategoryLabel(category) {
    const labels = {
        'exterior': 'Exterior',
        'living': 'Living Areas',
        'bedrooms': 'Bedrooms',
        'details': 'Details'
    };
    return labels[category] || category;
}

function createGalleryItem(imageData) {
    const div = document.createElement('div');
    div.className = 'gallery-item group relative overflow-hidden rounded cursor-pointer';
    div.setAttribute('data-category', imageData.category);
    div.setAttribute('data-filename', imageData.filename);

    div.innerHTML = `
        <img src="images/gallery/${imageData.filename}" alt="${imageData.title}"
             class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-primary text-xs font-bold uppercase tracking-widest mb-1">${getCategoryLabel(imageData.category)}</span>
            <h4 class="text-lg font-bold text-white">${imageData.title}</h4>
        </div>
    `;

    // Add click handler for lightbox - find index in filtered array when clicked
    div.addEventListener('click', () => {
        const clickedIndex = filteredImages.findIndex(img => img.filename === imageData.filename);
        openLightbox(clickedIndex >= 0 ? clickedIndex : 0);
    });

    return div;
}

function getFilteredImages() {
    if (currentFilter === 'all') {
        return allImagesData;
    }
    return allImagesData.filter(img => img.category === currentFilter);
}

function updateGallery() {
    filteredImages = getFilteredImages();

    // Get existing hero items
    const heroItems = Array.from(galleryGrid.querySelectorAll('.gallery-item:not(.expanded-item)'));

    if (!isExpanded) {
        // Remove any previously added expanded images
        const expandedItems = galleryGrid.querySelectorAll('.expanded-item');
        expandedItems.forEach(item => item.remove());

        // Show only hero images that match current filter
        heroItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (currentFilter === 'all' || category === currentFilter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        // Show all filtered images
        // First show matching hero items
        heroItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (currentFilter === 'all' || category === currentFilter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        // Then add all additional images from allImagesData
        // Remove any previously added expanded images
        const expandedItems = galleryGrid.querySelectorAll('.expanded-item');
        expandedItems.forEach(item => item.remove());

        // Add all filtered images (excluding hero images that are already in HTML)
        const heroFilenames = [
            'bExterior Dusk1.jpg',
            'Aerials-1.jpg',
            'cEntry and Living1.jpg',
            'dKitchen and Dining1.jpg',
            'iPrimary Bedroom Suite1.jpg',
            'gStairs and Landing1.jpg',
            'hHidden Room1.jpg',
            'ePowder1.jpg',
            'fBedroom1-1.jpg',
            'aExterior Afternoon1.jpg'
        ];

        filteredImages.forEach((imageData) => {
            if (!heroFilenames.includes(imageData.filename)) {
                const item = createGalleryItem(imageData);
                item.classList.add('expanded-item');
                galleryGrid.appendChild(item);
            }
        });
    }
}

function updateFilterButtons(activeFilter) {
    filterButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter === activeFilter) {
            btn.classList.remove('bg-transparent', 'border-white/10', 'text-text-secondary');
            btn.classList.add('bg-primary', 'text-white');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-transparent', 'border-white/10', 'text-text-secondary');
        }
    });
}

// ==================== LIGHTBOX FUNCTIONS ====================

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const imageData = filteredImages[currentLightboxIndex];
    lightboxImg.src = `images/gallery/${imageData.filename}`;
    lightboxImg.alt = imageData.title;
    lightboxCategory.textContent = getCategoryLabel(imageData.category);
    lightboxTitle.textContent = imageData.title;
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightboxContent();
}

// ==================== EVENT LISTENERS ====================

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;
        updateFilterButtons(filter);
        updateGallery();
    });
});

// View All button
viewAllBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
        viewAllBtn.innerHTML = 'Show Less <span class="material-symbols-outlined text-sm">arrow_upward</span>';
    } else {
        viewAllBtn.innerHTML = 'View All Images <span class="material-symbols-outlined text-sm">arrow_forward</span>';
    }
    updateGallery();
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ==================== INITIALIZATION ====================

// Add click handlers to existing hero images
document.addEventListener('DOMContentLoaded', () => {
    const existingItems = galleryGrid.querySelectorAll('.gallery-item');
    existingItems.forEach((item) => {
        const filename = item.querySelector('img').src.split('/').pop();

        item.addEventListener('click', () => {
            // Find index in the CURRENT filtered array, not the global array
            const clickedIndex = filteredImages.findIndex(img => img.filename === filename);
            openLightbox(clickedIndex >= 0 ? clickedIndex : 0);
        });
    });

    // Initialize filtered images array
    filteredImages = getFilteredImages();
});
