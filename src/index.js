const tempDisplay = document.getElementById('tempValue');
const increaseTemp = document.getElementById('increaseTempControl');
const decreaseTemp = document.getElementById('decreaseTempControl');
const landscape = document.getElementById('landscape');
const cityNameDisplay = document.getElementById('headerCityName');
const cityNameInput = document.getElementById('cityNameInput')
const tempButton = document.getElementById('currentTempButton');
const skySelect = document.getElementById('skySelect');
const gardenContent = document.getElementById('gardenContent');
const skyDisplay = document.getElementById('sky');
const resetButton = document.getElementById('cityNameReset');
const defaultCity = 'Seattle';
const fahrenheitOrCelcius = document.getElementById('fahrenheitOrCelcius');
const bodyElement = document.body;


let temperature = 88;
tempDisplay.innerText = temperature;

// Color of the temperature value number
const updateTempColor = () => {
tempDisplay.classList.remove('red', 'orange', 'yellow', 'green', 'teal');

if (temperature >= 80) {
    tempDisplay.classList.add('red');
} else if (temperature >= 70) {
    tempDisplay.classList.add('orange');
} else if (temperature >= 60) {
    tempDisplay.classList.add('yellow');
} else if (temperature >= 50) {
    tempDisplay.classList.add('green');
} else {
    tempDisplay.classList.add('teal');
}
};

// Landscape emojis
const updateLandscape = ()=>  {
let landscapeDisplay;

    if (temperature >= 80) {
        landscapeDisplay = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (temperature >= 70) {
        landscapeDisplay = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (temperature >= 60) {
        landscapeDisplay = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'; 
    } else {
        landscapeDisplay = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    }
    landscape.innerText = landscapeDisplay;
};

// Changing the temperature should change the page's background
const updateBackgroundColor = () => {
    bodyElement.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'cloudy-to-rainy');
    if (temperature >= 80) {
        bodyElement.classList.add('sunny');
    } else if (temperature >= 70) {
        bodyElement.classList.add('cloudy');
    } else if (temperature >= 60) {
        bodyElement.classList.add('rainy');
    } else if (temperature >= 50) {
        bodyElement.classList.add('cloudy-to-rainy');
    } else {
        bodyElement.classList.add('snowy');
    }
};

const updateDisplay = () => {
    updateTempColor();
    updateLandscape();
    updateBackgroundColor();
};

const addOneTemp = () => {
    temperature += 1;
    tempDisplay.innerText = temperature;
    
    updateDisplay()
}; 

const reduceOneTemp = () => {
    temperature -= 1;
    tempDisplay.innerText = temperature;

    updateDisplay()
};

increaseTemp.addEventListener('click', addOneTemp);
decreaseTemp.addEventListener('click', reduceOneTemp);

const updateCityName = () => {
    const cityText = cityNameInput.value;
    cityNameDisplay.innerText = cityText;
};

cityNameInput.addEventListener('input', updateCityName);


// function that gets weather data
const getWeather = (lat, lon) => {
    return axios
        .get(`http://localhost:5000/weather?lat=${lat}&lon=${lon}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(`Error is: ${error}`);
        });
};

// function that gets location 
const getLocation = (cityName) => {
    return axios
        .get(`http://localhost:5000/location?q=${cityName}`)
        .then((response) => {
            return response.data[0];
        })
        .catch((error) => {
            console.log(`Error is: ${error}`);
        });
};

// function that updates current temp using location and weather data
const getCurrentTemp = async () => {
    try {
        const cityName = cityNameDisplay.innerText;
        const locationData = await getLocation(cityName);
        const weatherData = await getWeather(locationData.lat, locationData.lon);
        const temperatureKelvin = weatherData.main.temp;
        temperature = Math.round((temperatureKelvin - 273.15) * 9/5 + 32); 
        tempDisplay.innerText = `${temperature} °F`;
        updateDisplay();
    }
    catch(error) {
        console.log(error);
    };
};
tempButton.addEventListener('click', getCurrentTemp);

// sky options with corresponding clouds
const skyOptions = [
    { name: 'Sunny', display: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️' },
    { name: 'Cloudy', display: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️' },
    { name: 'Rainy', display: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧' },
    { name: 'Snowy', display: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨' }
];
const skyChangeBackgroundColor = [
    {name: 'Sunny', backgroundColor: 'sunny'},
    {name: 'Cloudy', backgroundColor: 'cloudy'},
    {name: 'Rainy', backgroundColor: 'rainy'},
    {name: 'Snowy', backgroundColor: 'snowy'}
];

// create option element in skySelect area
skyOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.name.toLowerCase();
    optionElement.textContent = option.name;
    skySelect.appendChild(optionElement);
});

const updateSky = (event) => {
    // remove all possible sky classes
    gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
    // add the selected sky class to gardenContent so that background color also changes
    gardenContent.classList.add(event.target.value);
    // update sky display with emojis
    const selectedOption = skyOptions.find(option => option.name.toLowerCase() === event.target.value);
    skyDisplay.textContent = selectedOption.display;
     // Optional:Update the background color of the body element based on selected sky
    const selectedSky = skyChangeBackgroundColor.find(option => option.name.toLowerCase() === event.target.value);
    bodyElement.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
    bodyElement.classList.add(selectedSky.backgroundColor);
};

skySelect.addEventListener('change', updateSky);
// start with sunny
gardenContent.classList.add('sunny');
skyDisplay.textContent = skyOptions[0].display;

// Reset button: function to reset city to 'Seattle'
const cityDefault = () => {
    cityNameInput.value = defaultCity;
    cityNameDisplay.innerText = defaultCity;
    getCurrentTemp();
};

resetButton.addEventListener('click', cityDefault);

cityDefault();
updateDisplay();


// Optional enhancements
//Change temp between F to C and vice versa on click of button and display F or C
const changeFtoC = () => {
    temperature = Math.round((temperature - 32) * 5/9);
    tempDisplay.innerText = `${temperature} °C`;
    fahrenheitOrCelcius.removeEventListener('click', changeFtoC);
    fahrenheitOrCelcius.addEventListener('click', changeCtoF);
};

// Change temp between C to F on click of button and display F 
const changeCtoF = () => {
    temperature = Math.round((temperature * 9/5) + 32);
    tempDisplay.innerText = `${temperature} °F`;
    fahrenheitOrCelcius.removeEventListener('click', changeCtoF);
    fahrenheitOrCelcius.addEventListener('click', changeFtoC);
};

fahrenheitOrCelcius.addEventListener('click',changeFtoC);

