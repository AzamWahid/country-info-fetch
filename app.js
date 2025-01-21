const dropDown = document.querySelector('#inputGroupSelect04');
const btnSubmit = document.querySelector('#submit');

const cardImg = document.querySelector('#card-img');
const cardTitle = document.querySelector('#cardTitle');
const cardText = document.querySelector('#cardText');

let specificCntry;

fetch('https://restcountries.com/v3.1/all').then((countryAllData) => {

    return countryAllData.json();
}).then((data) => {

    data.forEach(country => {
        dropDown.innerHTML += `<option id="countryNameOptn">${country.name.common}</option>`
    });
    const pakistanOption = [...dropDown.options].find(option => option.textContent === "Pakistan");
    if (pakistanOption) {
        pakistanOption.selected = true;
    }
})

btnSubmit.addEventListener('click', () => {
    specificCntry = fetch(`https://restcountries.com/v3.1/name/${dropDown.value}`).then((countrySepcficData) => {
        return countrySepcficData.json();
    }).then((data) => {
        cardImg.src = data[0].flags?.png;
        cardTitle.innerHTML = data[0].name?.common;
        cardText.innerHTML = `Capital of ${data[0].name.common} : ${data[0].capital[0]}`
    })
})

