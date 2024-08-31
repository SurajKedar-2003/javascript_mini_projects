const userLocation = document.getElementById('userlocation');
// console.log(userLocation);
const temp_converter = document.getElementById('temp_converter'),
weather_img = document.querySelector('.weather_img'),
temperature = document.querySelector('.temperature'),
feels_like = document.querySelector('.feels_like'),
description = document.querySelector('.description'),
date = document.querySelector('.date'),
city = document.querySelector('.city'),
HValue = document.getElementById('HValue'),
WSValue = document.getElementById('WSValue'),
SRValue = document.getElementById('SRValue'),
SSValue = document.getElementById('SSValue'),
CValue = document.getElementById('CValue'),
VValue = document.getElementById('VValue'),
PValue = document.getElementById('PValue'),
week = document.querySelector('.week'),
video = document.getElementById('bg-video'),
video_src = document.getElementById('video_link');



const API_KEY = 'a5c1f67542557f995c5722e6443fc363'; 
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

document.getElementById('search_icon').addEventListener('click', function(){
    const location = userLocation.value;
    console.log(location);
    if(!location){
        alert('enter location');
        return
    }
    fetch(WEATHER_API_URL+location).then(response=>{
        try {
            return response.json();
        } catch (error) {
            console.log(error);
        }
       }).then(data=>{
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            console.log(`lon: ${lon} lat: ${lat}`);
            console.log(data);
            displayData(data);
            fetchWeeklyData(lon, lat);
            
       }).catch(error =>{
        console.error('error in fetching api', error);
    })
})

function fetchWeeklyData(lon, lat){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(response =>{
        try {
            return response.json();
        } catch (error) {
            console.log('error while fetching data api', error);
        }
    }).then(data=>{
        console.log(data);
        const daywiseData = filterWeeklyData(data.list);
        console.log("daywise data : ",daywiseData);
        displayWeeklyData(daywiseData);

        
    })
}

function displayData(data){
    temperature.innerHTML = `${tempConverter(data.main.temp)}`;
    feels_like.innerHTML = `Feels like ${tempConverter(data.main.feels_like)}`;
    description.innerHTML = data.weather[0].description;
    updateBackground(data.weather[0].description);
    const options2 ={
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
    date.innerHTML = getLongformatDateTime(data.dt, data.timezone, options2);
    city.innerHTML = `${data.name}, ${data.sys.country}`;

    HValue.innerHTML = Math.round(data.main.humidity)+ "<span>%</span>";
    const option1 = {
        hour:"numeric",
        minute:'numeric',
        hour12:true
    }
    SRValue.innerHTML = getLongformatDateTime(data.sys.sunrise, data.timezone, option1);
    SSValue.innerHTML = getLongformatDateTime(data.sys.sunset, data.timezone, option1 );
    WSValue.innerHTML = Math.round(data.wind.speed)+ "<span>m/s</span>";
    PValue.innerHTML = data.main.pressure+"<span>hPa</span>";
    VValue.innerHTML = (data.visibility)/1000 + '<span>Km</span>'
    CValue.innerHTML = data.clouds.all+ "<span>%</span>";
    weather_img.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`

}

function currDateTime(dtValue, offset, options={}){
    const date = new Date((dtValue+offset)*1000);
    return date.toLocaleTimeString([], {timeZone:'UTC', ...options});
}

function getLongformatDateTime(dtValue, offset, options){
    return currDateTime(dtValue, offset, options);
}

function filterWeeklyData(datalist){
    const currDate = new Date().toISOString().split('T')[0];

    return datalist.filter(item =>{
        const [date, time] = item.dt_txt.split(' ');
        return date !== currDate && time === '12:00:00'
    })
}

function displayWeeklyData(filterdata){

  week.innerHTML = '';

  filterdata.forEach(item => {
    const div = document.createElement('div');
    const option = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }

    let date = getLongformatDateTime(item.dt, 0, option).split(' at ');
    console.log("date : ", date);
    div.className = 'Day-item';

    div.innerHTML = date[0];
    div.innerHTML += `<img src= "https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"/>`
    div.innerHTML += `<p class="forecast_desc" >${item.weather[0].description}</p>`
    div.innerHTML += `<p>${tempConverter(item.main.temp_min)} / ${tempConverter(item.main.temp_min)}</p>`
    week.appendChild(div);
  });
}


function tempConverter(temp){
    let tempValue = Math.round(temp);
    let tempConverted = "";
    if(temp_converter.value == "°C"){
        tempConverted = tempValue+ "<span>"+"\xB0C</span>"
    }else{
        let CelciusToFer = (tempValue*9)/5+32;
        tempConverted = CelciusToFer+ "<span>"+"\xB0F</span>"
    }
    return tempConverted;
}

function updateBackground(description){
    let videoFile;

    if (description.includes('clouds')) {
        videoFile = 'img/cloudy1.mp4';
    }
    else if(description.includes('rain')){
        videoFile = 'img/rainy.mp4'
    }
    else if(description.includes('thunderstrom')){
        videoFile = '/img/thunder.mov'
    }
    else{
        videoFile = '/img/clearSky.mp4'
    }

    video_src.src = videoFile;
    video.load();
    video.playbackRate = 1.25;
}
