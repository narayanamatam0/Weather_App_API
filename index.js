const apikey="da1c00e3d3992828e77aa2cca4381253";
const weatherDataEl=document.getElementById('weather-data');
const cityInpEle=document.getElementById('city-input');
const form1=document.querySelector("form");
form1.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityInpEle.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});
async function getWeatherData(cityValue){
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data= await response.json();
        console.log(data);
        const temperature=Math.round(data.main.temp);
        const description=data.weather[0].description;
        const icon=data.weather[0].icon;
        const details=[
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="changed">`;
        weatherDataEl.querySelector('.temperature').textContent=`${temperature}°C`;
        weatherDataEl.querySelector('.description').textContent=description;
        weatherDataEl.querySelector('.details').innerHTML=details.map((detail)=>  `<div>${detail}</div>`).join("");

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML="";
        weatherDataEl.querySelector('.temperature').textContent="";
        weatherDataEl.querySelector('.description').textContent="An error happened, Please try again later";
        weatherDataEl.querySelector('.details').innerHTML="";
    }
}