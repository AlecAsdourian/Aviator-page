// Booking Configuration
const PRICING = {
    perNight: 1000,
    amenities: {
        'private-driver': 300,
        'heli-tour': 1500,
        'mani-pedi': 200,
        'sound-bath': 150,
        'yoga': 100,
        'massage': 250,
        'private-chef': 500,
        'wine-tasting': 400,
        'live-music': 800,
        'gambling-night': 600,
        'meditation': 100,
        'quantum-therapy': 350
    },
    taxRate: 0.115 // 11.5% tax
};

// Booking State
let selectedDates = [];
let selectedAmenities = new Set();

// Calendar Management
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize calendar
function initCalendar() {
    renderCalendar();

    // Month navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    // Update month/year display
    document.getElementById('current-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    document.getElementById('month-badge').textContent = `${monthNames[currentMonth].slice(0, 3)} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayHeaders.forEach((day, index) => {
        const header = document.createElement('span');
        header.className = `text-text-gray text-[10px] font-bold uppercase tracking-widest${index >= 5 ? ' text-primary' : ''}`;
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    // Calculate offset (convert Sunday=0 to Monday=0)
    const offset = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    // Add empty cells for offset
    for (let i = 0; i < offset; i++) {
        const emptyCell = document.createElement('span');
        calendarGrid.appendChild(emptyCell);
    }

    // Add day buttons
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isPast = date < today;

        const dayButton = document.createElement('button');
        dayButton.textContent = day;
        dayButton.className = 'h-10 w-10 mx-auto flex items-center justify-center text-sm transition-colors rounded';

        if (isPast) {
            dayButton.className += ' text-text-gray/50 cursor-not-allowed';
            dayButton.disabled = true;
        } else {
            dayButton.className += ' text-white hover:text-primary hover:bg-white/5';
            dayButton.addEventListener('click', () => selectDate(date));
        }

        // Check if this date is selected
        const isSelected = selectedDates.some(d =>
            d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate()
        );

        if (isSelected) {
            const wrapper = document.createElement('div');
            wrapper.className = 'relative group';

            dayButton.className = 'h-10 w-10 mx-auto flex items-center justify-center bg-primary text-white font-bold text-sm shadow-[0_0_15px_rgba(209,0,26,0.5)] rounded z-10 relative';

            // Add connecting bar for date ranges
            if (selectedDates.length === 2) {
                const isFirstDate = selectedDates[0].getTime() === date.getTime();
                const isLastDate = selectedDates[1].getTime() === date.getTime();

                const bar = document.createElement('div');
                bar.className = 'absolute top-1/2 w-full h-8 -translate-y-1/2 bg-primary/20 -z-0';

                if (isFirstDate) {
                    bar.className += ' left-1/2';
                } else if (isLastDate) {
                    bar.className += ' right-1/2';
                }

                wrapper.appendChild(bar);
            }

            wrapper.appendChild(dayButton);
            calendarGrid.appendChild(wrapper);
        } else {
            calendarGrid.appendChild(dayButton);
        }
    }

    updateQuote();
}

function selectDate(date) {
    const dateTime = date.getTime();

    // Check if date is already selected
    const existingIndex = selectedDates.findIndex(d => d.getTime() === dateTime);

    if (existingIndex !== -1) {
        // Deselect the date
        selectedDates.splice(existingIndex, 1);
    } else {
        // Add new date
        if (selectedDates.length === 0) {
            // First date selected
            selectedDates.push(date);
        } else if (selectedDates.length === 1) {
            // Second date - ensure it's consecutive
            const existingDate = selectedDates[0];
            const dayDiff = Math.abs((dateTime - existingDate.getTime()) / (1000 * 60 * 60 * 24));

            if (dayDiff === 1) {
                // Consecutive day - add it
                selectedDates.push(date);
                selectedDates.sort((a, b) => a - b); // Sort chronologically
            } else {
                // Not consecutive - replace the existing date
                selectedDates = [date];
            }
        } else {
            // Already have 2 dates - replace with new selection
            selectedDates = [date];
        }
    }

    renderCalendar();
}

// Amenity Management
function initAmenities() {
    const amenityCheckboxes = document.querySelectorAll('.amenity-checkbox');

    amenityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const amenityId = e.target.dataset.amenity;

            if (e.target.checked) {
                selectedAmenities.add(amenityId);
            } else {
                selectedAmenities.delete(amenityId);
            }

            updateQuote();
        });
    });
}

// Quote Calculation
function updateQuote() {
    const numNights = selectedDates.length === 2 ? 1 : selectedDates.length;
    const stayTotal = numNights * PRICING.perNight;

    let amenitiesTotal = 0;
    const amenityItems = [];

    selectedAmenities.forEach(amenityId => {
        const price = PRICING.amenities[amenityId];
        amenitiesTotal += price;

        // Get amenity name from checkbox
        const checkbox = document.querySelector(`[data-amenity="${amenityId}"]`);
        const label = checkbox.closest('label');
        const nameElement = label.querySelector('.text-white.font-bold');

        amenityItems.push({
            name: nameElement.textContent,
            price: price
        });
    });

    const subtotal = stayTotal + amenitiesTotal;
    const taxes = Math.round(subtotal * PRICING.taxRate);
    const total = subtotal + taxes;

    // Update Quote Summary
    updateQuoteSummary(numNights, stayTotal, amenityItems, subtotal, taxes, total);
}

function updateQuoteSummary(numNights, stayTotal, amenityItems, subtotal, taxes, total) {
    const quoteSummary = document.getElementById('quote-items');

    let html = '';

    // Stay details
    if (selectedDates.length > 0) {
        const dateRange = selectedDates.length === 2
            ? `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])} (1 Night)`
            : selectedDates.length === 1
            ? `${formatDate(selectedDates[0])} (1 Night)`
            : 'No dates selected';

        html += `
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-white text-sm font-medium">Residence Stay</span>
                    <span class="text-text-gray text-xs">${dateRange}</span>
                </div>
                <span class="text-white font-mono">$${stayTotal.toLocaleString()}</span>
            </div>
        `;
    } else {
        html += `
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-white text-sm font-medium">Residence Stay</span>
                    <span class="text-text-gray text-xs">No dates selected</span>
                </div>
                <span class="text-white font-mono">$0</span>
            </div>
        `;
    }

    // Amenities
    amenityItems.forEach(item => {
        html += `
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-white text-sm font-medium">${item.name}</span>
                    <span class="text-text-gray text-xs">Amenity Add-on</span>
                </div>
                <span class="text-white font-mono">$${item.price.toLocaleString()}</span>
            </div>
        `;
    });

    html += `
        <div class="h-px bg-white/10 my-4"></div>
        <div class="flex justify-between items-center">
            <span class="text-text-gray text-sm uppercase tracking-wider">Subtotal</span>
            <span class="text-white font-mono">$${subtotal.toLocaleString()}</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-text-gray text-sm uppercase tracking-wider">Taxes & Fees (Est.)</span>
            <span class="text-white font-mono">$${taxes.toLocaleString()}</span>
        </div>
    `;

    quoteSummary.innerHTML = html;

    // Update total
    document.getElementById('quote-total').textContent = `$${total.toLocaleString()}`;
}

function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
}

// Generate Reference Number
function generateReferenceNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `AV-${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Save booking to localStorage and update reference
function saveBookingData() {
    const referenceNumber = generateReferenceNumber();

    const bookingData = {
        reference: referenceNumber,
        dates: selectedDates.map(d => d.toISOString()),
        amenities: Array.from(selectedAmenities),
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('aviator_booking', JSON.stringify(bookingData));

    // Update reference number display
    document.getElementById('quote-reference').textContent = `REF: ${referenceNumber}`;

    return referenceNumber;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initAmenities();
    updateQuote();

    // Add event listener to "Book a Consultation" button
    const bookConsultationBtn = document.querySelector('a[href="book-consultation.html"]');
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', (e) => {
            saveBookingData();
        });
    }
});
