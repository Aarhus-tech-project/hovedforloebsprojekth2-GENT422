async function loadReservations() {

    const response = await fetch(`${API_URL}/reservations`);

    const reservations = await response.json();

    const reservationList = document.getElementById('reservationList');

    reservationList.innerHTML = '';

    reservations.forEach(reservation => {

        reservationList.innerHTML += `
            <div class="card">

                <h3>Reservation #${reservation.reservationId}</h3>

                <p><strong>Kunde:</strong> ${reservation.customerName}</p>

                <p><strong>Lokation:</strong> ${reservation.venue?.name}</p>

                <p><strong>Personer:</strong> ${reservation.personCount}</p>

            </div>
        `;
    });
}

async function loadVenueDropdown() {

    const response = await fetch(`${API_URL}/venues`);

    const venues = await response.json();

    const dropdown = document.getElementById('reservationVenue');

    dropdown.innerHTML = '<option value="">Vælg lokation</option>';

    venues.forEach(venue => {

        dropdown.innerHTML += `
            <option value="${venue.venueId}">
                ${venue.name}
            </option>
        `;
    });
}

async function createReservation() {

    const venueId = document.getElementById('reservationVenue').value;

    const customerName = document.getElementById('customerName').value;

    const seatCount = document.getElementById('seatCount').value;

    const reservation = {
        venueId,
        customerName,
        seatCount
    };

    const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });

    if(response.ok) {

        alert('Reservation oprettet');

        document.getElementById('customerName').value = '';
        document.getElementById('seatCount').value = '';
    }
}