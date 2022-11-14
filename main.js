let lat;
let long;
let country;
let tempruture;
let weatherDescription;
let feelLike;
let icon;
let id;
let APIKey = "f788b5fc412e548859e20d400c89a0b7";


function getLocationData(){             // fetch the URL to get the latitude & longitude for the Helsingborg stad 
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Helsingborg&limit=1&appid=${APIKey}`)
    .then((respons) => {
        if(respons.ok) {
            return respons.json();
        }
    })
    .then(data => {                     
        console.log(data);
        country = `${data[0].name}, ${data[0].country}`;
        lat = data[0].lat;
        long = data[0].lon;

        function getWeatherData(){      // fetch the URL to get the weather data   
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`) // units=metric To change the temperature from Kelvin to celsius
            .then(respons => respons.json())
            .then(data => {
                console.log(data);
                tempruture = data.main.temp;
                weather = data.weather[0].description;
                feelLike = data.main.feels_like;
                // icon = data.weather[0].main;

                                        // display the data on the screen - DOM
                document.getElementById('region').innerHTML = `<img src='https://freesvg.org/storage/img/thumb/joede-location-symbol.png' class='locationIcon'/> ${country}` ;
                document.getElementById('temp').innerHTML = `${Math.round(tempruture)}<sup id="celsius">°C</sup>`;
                document.getElementById('description').innerHTML = weather;
                document.getElementById('feelLike').innerHTML = `Feel like : ${Math.round(feelLike)}<sup id="FeelLikeCelsius">°C</sup>`;

                // To get the icon, there are two methods:
                // 1- The first method:  // get the icon from JSON document according to ('https://openweathermap.org/weather-conditions/')
                /*
                document.getElementById('icon').src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
                console.log(icon);
                console.log(data.weather[0].icon);
                */

                // 2- The second method :  // Channge the weather icon according to the id ('https://openweathermap.org/weather-conditions/')
                id = data.weather[0].id;
                console.log(id);
                icon = document.getElementById('icon');

                 if(id >= 200 && id <= 232){
                    icon.src = 'https://freesvg.org/storage/img/thumb/weather-storm.png';
                 } else if((id >= 300 && id <= 321) || (id >= 520 && id <= 531)){
                    icon.src = 'https://cdn-icons-png.flaticon.com/128/8324/8324797.png';
                 }else if(id >= 500 && id <= 504) {
                    icon.src = 'https://cdn-icons-png.flaticon.com/128/8841/8841315.png';
                 }else if(id == 511){
                    icon.src = 'https://freesvg.org/storage/img/thumb/weather-snow.png';
                 }else if(id >= 600 && id <= 622){
                    icon.src = 'https://cdn-icons-png.flaticon.com/128/2315/2315377.png';
                 }else if(id >= 701 && id <= 781){
                    icon.src = 'https://freesvg.org/storage/img/thumb/Cartoon_Tornado.png';
                 }else if(id == 800){
                    icon.src = 'https://freesvg.org/storage/img/thumb/weather-clear.png';
                 }else if(id >= 801 && id <= 804){
                    icon.src = 'https://cdn-icons-png.flaticon.com/128/4064/4064276.png';
                 }
                console.log(icon);           
            })
        }
        getWeatherData();               // Call the second function 
    })
}
getLocationData()                       // Call the First function 
