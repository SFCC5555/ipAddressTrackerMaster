const iPAddress = document.querySelector('.iPAddress');
const iPLocation = document.querySelector('.iPLocation');
const timeZone = document.querySelector('.timeZone');
const iSP = document.querySelector('.iSP');
const iPInput = document.querySelector('.iPInput');
const searchButton = document.querySelector('button');
const mapContainer = document.querySelector('.mapContainer');


function render() {

    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SYO8eRj2PEw6hwVg3KcQFC0KNi7I9&ipAddress=${iPInput.value}`)
    .then(response => response.json())
    .then(data => {

    console.log(data);


    if (data.ip!==undefined) {

        iPAddress.innerHTML = `<span>IP ADDRESS </span>${data.ip}`;
        iPLocation.innerHTML = `<span>LOCATION </span>${data.location.city}, ${data.location.region} ${data.location.postalCode}`; 
        timeZone.innerHTML = `<span>TIMEZONE </span>UTC${data.location.timezone}`; 
        iSP.innerHTML = `<span>ISP </span>${data.isp}`;

        mapContainer.innerHTML = "";

        mapContainer.innerHTML = `<div id='map'></div>`

        let map = L.map('map').setView([data.location.lat, data.location.lng], 15);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    
        let myIcon = L.icon({
            iconUrl: './images/icon-location.svg',
            iconSize: [30, 37],
        });
    
        let marker = L.marker([data.location.lat, data.location.lng],{icon: myIcon}).addTo(map);



    } else {
        alert('Invalid IP')
    }



})
}

render();

searchButton.addEventListener('click',render);

function validInput() {

    setTimeout(()=> {

        if (/\d[\d\.]*$/.test(iPInput.value)) {
            iPInput.value=iPInput.value
        } else {
            iPInput.value=iPInput.value.slice(0,iPInput.value.length-1)
        }

    },0)


}

iPInput.addEventListener('keydown',validInput);




