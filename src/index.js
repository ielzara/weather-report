let temperature = 88;

const tempDisplay = document.getElementById('tempValue');
tempDisplay.innerText = temperature;

const addOneTemp = () => {
    console.log(temperature)
    temperature += 1;
    tempDisplay.innerText = temperature;
    updateColor();
    updateLandscape();
}; 
const increaseTemp = document.getElementById('increaseTempControl');
increaseTemp.addEventListener('click', addOneTemp);

const reduceOneTemp = () => {
    console.log(temperature)
    temperature -= 1;
    tempDisplay.innerText = temperature;
    updateColor();
    updateLandscape();
};
const decreaseTemp = document.getElementById('decreaseTempControl');
decreaseTemp.addEventListener('click', reduceOneTemp);

const updateColor = () => {
    if (temperature >= 80) {
        tempDisplay.style.color = 'red';
    } else if (temperature >= 70) {
        tempDisplay.style.color = 'orange';
    } else if (temperature >= 60) {
        tempDisplay.style.color = 'yellow';
    } else if (temperature >= 50) {
        tempDisplay.style.color = 'green';
    } else {
        tempDisplay.style.color = 'teal';
    }
};

const landscapeDisplay = document.getElementById('landscape');

const updateLandscape = () => {
    if (temperature >= 80) {
        landscapeDisplay.innerText = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
    }
    } else if (temperature >= 70) {
        landscapeDisplay.innerText = 
    }
};