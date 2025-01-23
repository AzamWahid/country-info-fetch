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
    dropDown.dispatchEvent(new MouseEvent('change'));
})

dropDown.addEventListener('change', () => {
    console.log("hwllo");
    specificCntry = fetch(`https://restcountries.com/v3.1/name/${dropDown.value}`).then((countrySepcficData) => {
        return countrySepcficData.json();
    }).then((data) => {
        const currencyCode = Object.keys(data[0].currencies)[0]; // Gets the first currency code
        const currency = data[0].currencies[currencyCode];
        console.log(currency)
        cardImg.src = data[0].flags?.png;
        cardTitle.innerHTML = data[0].name?.common;
        cardText.innerHTML = `${data[0].name.common} (${data[0].name.official}) is located in the ${data[0].region} region, specifically in ${data[0].subregion}. ` +
                            `Its capital city is ${data[0].capital}, and it has a population of approximately ${data[0].population.toLocaleString()} people. ` +
                            `The country covers an area of ${data[0].area.toLocaleString()} square kilometers. ` +
                            `It shares borders with ${data[0].borders.join(", ")}. ` +
                            `${data[0].name.common} uses the ${currency.name} (${currency.symbol}) as its currency. ` +
                            `The flag of France is represented as ${data[0].flags.alt}.`
    })
})


