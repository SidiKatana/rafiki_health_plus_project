function scrollToMap() {
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Google Maps and other functionalities here
    initMap(); // Call the function to initialize the map
});

// Sample function to demonstrate Google Maps integration
function initMap() {
    const mapOptions = {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    // Add marker
    const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: 'Health Center'
    });
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Form handling (example)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Add your authentication logic here (e.g., API call)
    console.log('Login:', username, password);
    closeModal('loginModal');
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // Add your registration logic here (e.g., API call)
    console.log('Register:', username, password);
    closeModal('registerModal');
});

document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;

    // Add your appointment logic here (e.g.,
});
