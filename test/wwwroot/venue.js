const API_URL = 'http://localhost:5000/api';

async function loadVenues() {

    const response = await fetch(`${API_URL}/venues`);

    const venues = await response.json();

    const venueList = document.getElementById('venueList');

    venueList.innerHTML = '';

    venues.forEach(venue => {

        venueList.innerHTML += `
            <div class="card">

                <h3>${venue.name}</h3>

                <p><strong>Type:</strong> ${venue.venueType}</p>

                <p><strong>ID:</strong> ${venue.venueId}</p>

                <div class="card-buttons">

                    <button class="edit-btn"
                        onclick="editVenue(${venue.venueId}, '${venue.name}')">
                        Rediger
                    </button>

                    <button class="delete-btn"
                        onclick="deleteVenue(${venue.venueId})">
                        Slet
                    </button>

                </div>

            </div>
        `;
    });
}

async function createVenue() {

    const name = document.getElementById('venueName').value;

    const venueType = document.getElementById('venueType').value;

    const capacity = document.getElementById('venueCapacity').value;

    const newVenue = {
        name,
        venueType,
        capacity
    };

    const response = await fetch(`${API_URL}/venues`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVenue)
    });

    if(response.ok) {

        alert('Lokation oprettet');

        document.getElementById('venueName').value = '';
        document.getElementById('venueType').value = '';
        document.getElementById('venueCapacity').value = '';

        loadVenues();
    }
}

async function deleteVenue(id) {

    const confirmDelete = confirm('Vil du slette lokationen?');

    if(!confirmDelete) {
        return;
    }

    const response = await fetch(`${API_URL}/venues/${id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        loadVenues();
    }
}

async function editVenue(id, currentName) {

    const newName = prompt('Nyt navn', currentName);

    if(!newName) {
        return;
    }

    const response = await fetch(`${API_URL}/venues/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName
        })
    });

    if(response.ok) {
        loadVenues();
    }
}

loadVenues();