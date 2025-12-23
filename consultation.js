// Consultation booking state
let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Available time slots
const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '16:30', available: true },
    { time: '17:00', available: false } // Example of unavailable slot
];

// Initialize calendar
function initConsultationCalendar() {
    renderConsultationCalendar();

    // Month navigation
    const prevBtn = document.querySelector('.monolith-panel button:first-of-type');
    const nextBtn = document.querySelector('.monolith-panel button:last-of-type');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderConsultationCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderConsultationCalendar();
        });
    }
}

function renderConsultationCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    // Update month display
    const monthDisplay = document.querySelector('.monolith-panel p.text-white');
    if (monthDisplay) {
        monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

    const calendarGrid = document.querySelector('.monolith-panel .grid.grid-cols-7');
    if (!calendarGrid) return;

    // Clear existing days (keep weekday headers)
    const dayButtons = calendarGrid.querySelectorAll('button');
    dayButtons.forEach(btn => btn.remove());

    // Get today for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate previous month's last days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthDaysToShow = startingDayOfWeek;

    // Add previous month's trailing days
    for (let i = prevMonthDaysToShow - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const dayButton = createDayButton(day, true, false);
        calendarGrid.appendChild(dayButton);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const isPast = date < today;
        const isSelected = selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

        const dayButton = createDayButton(day, false, isPast, isSelected);

        if (!isPast) {
            dayButton.addEventListener('click', () => selectConsultationDate(date));
        }

        calendarGrid.appendChild(dayButton);
    }
}

function createDayButton(day, isOtherMonth, isPast, isSelected = false) {
    const button = document.createElement('button');
    button.className = 'h-10 w-full text-sm relative group';

    const span = document.createElement('span');
    span.className = 'absolute inset-0 m-auto size-8 flex items-center justify-center rounded-sm';
    span.textContent = day;

    if (isOtherMonth) {
        button.className += ' text-text-muted';
        span.className += ' border border-transparent';
    } else if (isPast) {
        button.className += ' text-text-muted opacity-50 cursor-not-allowed';
        span.className += ' border border-transparent';
        button.disabled = true;
    } else if (isSelected) {
        button.className += ' text-white font-bold';
        span.className += ' bg-primary shadow-[0_0_15px_rgba(202,7,24,0.5)]';
    } else {
        button.className += ' text-white font-bold transition-colors';
        span.className += ' border border-transparent bg-white/5 group-hover:border-white/20';
    }

    button.appendChild(span);
    return button;
}

function selectConsultationDate(date) {
    selectedDate = date;
    renderConsultationCalendar();
    updateSelectedSlotDisplay();
}

// Initialize time slots
function initTimeSlots() {
    const timeSlotContainer = document.querySelector('.grid.grid-cols-2');
    if (!timeSlotContainer) return;

    // Clear existing slots
    timeSlotContainer.innerHTML = '';

    timeSlots.forEach(slot => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'group flex items-center justify-center h-10 border rounded-sm transition-all';

        if (!slot.available) {
            button.className += ' border-white/10 bg-transparent opacity-50 cursor-not-allowed';
            button.disabled = true;

            const span = document.createElement('span');
            span.className = 'text-xs font-medium text-text-muted line-through';
            span.textContent = slot.time;
            button.appendChild(span);
        } else {
            const isSelected = selectedTime === slot.time;

            if (isSelected) {
                button.className += ' border-primary bg-primary/20 shadow-[0_0_10px_rgba(202,7,24,0.2)]';
                const span = document.createElement('span');
                span.className = 'text-xs font-bold text-white';
                span.textContent = slot.time;
                button.appendChild(span);
            } else {
                button.className += ' border-white/10 bg-transparent hover:border-primary hover:bg-primary/10';
                const span = document.createElement('span');
                span.className = 'text-xs font-medium text-text-muted group-hover:text-white';
                span.textContent = slot.time;
                button.appendChild(span);
            }

            button.addEventListener('click', () => selectTimeSlot(slot.time));
        }

        timeSlotContainer.appendChild(button);
    });
}

function selectTimeSlot(time) {
    selectedTime = time;
    initTimeSlots();
    updateSelectedSlotDisplay();
}

function updateSelectedSlotDisplay() {
    const slotDisplay = document.querySelector('.flex.items-center.justify-between.text-xs span.text-white');

    if (slotDisplay) {
        if (selectedDate && selectedTime) {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const formattedDate = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
            slotDisplay.textContent = `${formattedDate} • ${selectedTime}`;
        } else if (selectedDate) {
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const formattedDate = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
            slotDisplay.textContent = `${formattedDate} • No time selected`;
        } else if (selectedTime) {
            slotDisplay.textContent = `No date • ${selectedTime}`;
        } else {
            slotDisplay.textContent = 'No selection';
        }
    }
}

// Form validation
function initFormValidation() {
    const firstNameInput = document.querySelector('input[placeholder="Enter first name"]');
    const lastNameInput = document.querySelector('input[placeholder="Enter last name"]');
    const phoneInput = document.querySelector('input[type="tel"]');
    const emailInput = document.querySelector('input[type="email"]');

    // First name - letters only
    if (firstNameInput) {
        firstNameInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
        });
    }

    // Last name - letters only
    if (lastNameInput) {
        lastNameInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
        });
    }

    // Phone - numbers and formatting characters only
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Allow numbers, spaces, hyphens, parentheses, and plus sign
            e.target.value = e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '');
        });
    }

    // Email validation on blur
    if (emailInput) {
        emailInput.addEventListener('blur', (e) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.value && !emailPattern.test(e.target.value)) {
                e.target.style.borderColor = '#ca0718';
            } else {
                e.target.style.borderColor = '';
            }
        });
    }
}

// Form submission
function initFormSubmission() {
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="button"]');

    if (submitButton && form) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Validate required fields
            const firstNameInput = document.querySelector('input[placeholder="Enter first name"]');
            const lastNameInput = document.querySelector('input[placeholder="Enter last name"]');
            const emailInput = document.querySelector('input[type="email"]');

            if (!firstNameInput.value.trim()) {
                alert('Please enter your first name');
                firstNameInput.focus();
                return;
            }

            if (!lastNameInput.value.trim()) {
                alert('Please enter your last name');
                lastNameInput.focus();
                return;
            }

            if (!emailInput.value.trim()) {
                alert('Please enter your email address');
                emailInput.focus();
                return;
            }

            // Validate email format
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            if (!selectedDate) {
                alert('Please select a consultation date');
                return;
            }

            if (!selectedTime) {
                alert('Please select a consultation time');
                return;
            }

            // Gather form data
            const consultationData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: document.querySelector('input[type="tel"]').value.trim(),
                notes: document.querySelector('textarea').value.trim(),
                date: selectedDate.toISOString(),
                time: selectedTime,
                timestamp: new Date().toISOString()
            };

            // Try to load existing booking data from previous page
            const existingBooking = localStorage.getItem('aviator_booking');
            if (existingBooking) {
                const bookingData = JSON.parse(existingBooking);
                consultationData.bookingReference = bookingData.reference;
                consultationData.bookingDates = bookingData.dates;
                consultationData.amenities = bookingData.amenities;
            }

            // Save consultation data
            localStorage.setItem('aviator_consultation', JSON.stringify(consultationData));

            // Show confirmation (you can replace this with actual submission logic)
            alert(`Consultation booked!\n\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTime}\nName: ${consultationData.firstName} ${consultationData.lastName}\nEmail: ${consultationData.email}`);

            // Optionally redirect or clear form
            // window.location.href = 'confirmation.html';
        });
    }
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    initConsultationCalendar();
    initTimeSlots();
    initFormValidation();
    initFormSubmission();
});
