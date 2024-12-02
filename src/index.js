let temperature = 88;

const tempDisplay = document.getElementById('tempValue');
tempDisplay.innerText = temperature;

const addOneTemp = () => {
    console.log(temperature)
    temperature += 1;
    tempDisplay.innerText = temperature;
}; 
const increaseTemp = document.getElementById('increaseTempControl');
increaseTemp.addEventListener('click', addOneTemp);

const reduceOneTemp = () => {
    console.log(temperature)
    temperature -= 1;
    tempDisplay.innerText = temperature;
};
const decreaseTemp = document.getElementById('decreaseTempControl');
decreaseTemp.addEventListener('click', reduceOneTemp);