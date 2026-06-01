function showTab(tabId) {

    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active-tab');

    event.target.classList.add('active');

    if(tabId === 'venues') {
        loadVenues();
    }

    if(tabId === 'reservations') {
        loadReservations();
    }

    if(tabId === 'createReservation') {
        loadVenueDropdown();
    }
}