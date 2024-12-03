const tempDisplay = document.getElementById('tempValue');
const increaseTemp = document.getElementById('increaseTempControl');
const decreaseTemp = document.getElementById('decreaseTempControl');
const landscape = document.getElementById('landscape');
const cityNameDisplay = document.getElementById('headerCityName');
const cityNameInput = document.getElementById('cityNameInput')
const tempButton = document.getElementById('currentTempButton');


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

const updateDisplay = () => {
    updateTempColor();
    updateLandscape();
};

const addOneTemp = () => {
    // console.log(temperature)
    temperature += 1;
    tempDisplay.innerText = temperature;
    
    updateDisplay()
}; 

const reduceOneTemp = () => {
    // console.log(temperature) 
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
        const temperatureKelvin = weatherData.current.temp;
        temperature = (temperatureKelvin - 273.15) * 9/5 + 32;
        tempDisplay.innerText = temperature;
        updateDisplay();
    }
    catch(error) {
        console.log(error);
    };
};
tempButton.addEventListener('click', getCurrentTemp);

updateDisplay();