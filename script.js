'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position) {
console.log(position);
const {latitude} = position.coords;
const {longitude} = position.coords;
console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

    const coord = [latitude,longitude];

    const map = L.map('map').setView(coord, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    // Handling clicks on maps
    map.on('click', function(mapE){
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();

    })
}, 
function(){
    alert ('Could not get your possition');
});

form.addEventListener('submit', function(e) {
    e.preventDefault;

    // Clear input fields
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';

    // Display marker
    console.log(mapEvent);
    const {lat, lng} = mapEvent.latlng;
    L.marker([lat,lng]).addTo(map)
    .bindPopup(L.popup({
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup'}))
    .setPopupContent('Workout')
    .openPopup();

})

inputType.addEventListener('change', function(){
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
})