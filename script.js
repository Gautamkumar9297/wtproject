document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminPanel = document.getElementById('admin-panel');
    const closeAdminBtn = document.getElementById('close-admin-btn');
    const scheduleForm = document.getElementById('schedule-form');
    const studentMealSchedule = document.getElementById('student-meal-schedule');
    const bookMealBtn = document.getElementById('book-meal-btn');
    const feedbackForm = document.getElementById('feedback-form');
    const totalBookingsSpan = document.getElementById('total-bookings');
    const totalFeedbackSpan = document.getElementById('total-feedback');

    // --- State Management ---
    // Initialize with a default schedule
    let mealSchedule = {
        Monday: { Breakfast: 'Aloo Paratha', Lunch: 'Rajma Chawal', Dinner: 'Paneer Butter Masala' },
        Tuesday: { Breakfast: 'Poha', Lunch: 'Kadhi Pakoda', Dinner: 'Chole Bhature' },
        Wednesday: { Breakfast: 'Idli Sambar', Lunch: 'Veg Biryani', Dinner: 'Dal Makhani' },
        Thursday: { Breakfast: 'Upma', Lunch: 'Mix Veg', Dinner: 'Shahi Paneer' },
        Friday: { Breakfast: 'Dosa', Lunch: 'Sambhar Rice', Dinner: 'Matar Paneer' },
        Saturday: { Breakfast: 'Masala Oats', Lunch: 'Dal Tadka', Dinner: 'Kofta Curry' },
        Sunday: { Breakfast: 'Pancakes', Lunch: 'Special Thali', Dinner: 'Pizza' }
    };
    let totalBookings = 0;
    let totalFeedback = 0;

    // --- Functions ---

    /**
     * Renders the meal schedule for the student view.
     */
    const renderSchedule = () => {
        studentMealSchedule.innerHTML = ''; // Clear previous content
        for (const day in mealSchedule) {
            const dayMenu = document.createElement('div');
            dayMenu.classList.add('day-menu');
            dayMenu.innerHTML = `
                <h3>${day}</h3>
                <p><strong>Breakfast:</strong> ${mealSchedule[day].Breakfast}</p>
                <p><strong>Lunch:</strong> ${mealSchedule[day].Lunch}</p>
                <p><strong>Dinner:</strong> ${mealSchedule[day].Dinner}</p>
            `;
            studentMealSchedule.appendChild(dayMenu);
        }
    };

    /**
     * Updates the report counters in the admin panel.
     */
    const updateReports = () => {
        totalBookingsSpan.textContent = totalBookings;
        totalFeedbackSpan.textContent = totalFeedback;
    };


    // --- Event Listeners ---

    // Admin Panel Toggle
    adminLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        adminPanel.classList.remove('hidden');
        adminPanel.style.display = 'flex'; // Re-enable flex display
    });

    closeAdminBtn.addEventListener('click', () => {
        adminPanel.classList.add('hidden');
        adminPanel.style.display = 'none';
    });

    // Admin: Set Meal Schedule
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const day = document.getElementById('admin-day-select').value;
        const breakfast = document.getElementById('breakfast-item').value;
        const lunch = document.getElementById('lunch-item').value;
        const dinner = document.getElementById('dinner-item').value;

        mealSchedule[day] = { Breakfast: breakfast, Lunch: lunch, Dinner: dinner };
        renderSchedule(); // Update the student view immediately
        alert(`${day}'s schedule has been updated successfully!`);
        scheduleForm.reset();
    });

    // Student: Book a Meal
    bookMealBtn.addEventListener('click', () => {
        const day = document.getElementById('day-select').value;
        const meal = document.getElementById('meal-select').value;
        alert(`Your booking for ${meal} on ${day} is confirmed!`);
        totalBookings++;
        updateReports();
    });

    // Student: Submit Feedback
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your valuable feedback!');
        totalFeedback++;
        updateReports();
        feedbackForm.reset();
    });

    // Generate Report Button (for demonstration)
    document.getElementById('generate-report-btn').addEventListener('click', () => {
        alert(`--- Monthly Report ---\nTotal Meals Booked: ${totalBookings}\nTotal Feedback Received: ${totalFeedback}`);
    });


    // --- Initial Load ---
    renderSchedule();
    updateReports();
});