let APIKey = "f788b5fc412e548859e20d400c89a0b7";                        // Global variable
                                                                        // (Async - AJAX) fetch. Call the server to get the
                                                                        // latitude & longitude for the Helsingborg stad 
let promise = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Helsingborg&limit=1&appid=${APIKey}`)
.then((respons) => {                                                    // send a request 
    if(respons.ok) {
        return respons.json();                                          // convert the response.text() to JSON document (Array)
    }
})
.then(data => {                     
    console.log(data);                                                  // get the response data from the server
    country = `${data[0].name}, ${data[0].country}`;                    // get the country's name and the region's name 
    lat = data[0].lat;                                                  // get the location latitude for Helsingborg stad 
    long = data[0].lon;                                                 // get the location longitude for Helsingborg stad 

                                                                        // fetch the URL to get the weather data
                                                                        // units=metric To change the temperature from Kelvin to celsius   
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`) 
        .then(respons => respons.json())                                // convert the response.text() to JSON (Object)
        .then(data => {
            console.log(data);                                          // get the response data from the server
            let temperature = data.main.temp;                           // the temperature i Helsingborg now
            let weatherDescription = data.weather[0].description;       // the weather discription 
            let feelLike = data.main.feels_like;                       
            // icon = data.weather[0].main;

                                                                        // display the data on the screen - DOM
            document.getElementById('region').innerHTML = 
            `<img src='https://freesvg.org/storage/img/thumb/joede-location-symbol.png' class='locationIcon'/> ${country}` ;
            document.getElementById('temp').innerHTML = `${Math.round(temperature)}<sup id="celsius">°C</sup>`;
            document.getElementById('description').innerHTML = weatherDescription;
            document.getElementById('feelLike').innerHTML = `Feel like : ${Math.round(feelLike)}<sup id="FeelLikeCelsius">°C</sup>`;

            // To get the icon, there are two methods:
            // 1- get the icon from JSON document according to ('https://openweathermap.org/weather-conditions/')
                /*
                document.getElementById('icon').src = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
                console.log(icon);
                console.log(data.weather[0].icon);
                */

            // 2- Channge the weather icon according to the id ('https://openweathermap.org/weather-conditions/')
            let id = data.weather[0].id;
            let icon = document.getElementById('icon');

            if(id >= 200 && id <= 232){
                icon.src = 'https://freesvg.org/storage/img/thumb/weather-storm.png';      // weather description : thunderstorm
            } else if((id >= 300 && id <= 321) || (id >= 520 && id <= 531)){
                icon.src = 'https://cdn-icons-png.flaticon.com/128/8324/8324797.png';      // weather description : shower rain
            }else if(id >= 500 && id <= 504) {
                icon.src = 'https://cdn-icons-png.flaticon.com/128/8841/8841315.png';      // weather description :	rain
            }else if(id == 511){
                icon.src = 'https://freesvg.org/storage/img/thumb/weather-snow.png';       // weather description : freezing rain
            }else if(id >= 600 && id <= 622){
                icon.src = 'https://cdn-icons-png.flaticon.com/128/2315/2315377.png';      // weather description : Snow
            }else if(id >= 701 && id <= 781){
                icon.src = 'https://freesvg.org/storage/img/thumb/Cartoon_Tornado.png';    // weather description : strom
            }else if(id == 800){
                icon.src = 'https://freesvg.org/storage/img/thumb/weather-clear.png';      // weather description : sunny / clear
            }else if(id >= 801 && id <= 804){
                icon.src = 'https://cdn-icons-png.flaticon.com/128/4064/4064276.png';      // weather description : Clouds
            }
            console.log(icon);           
        });     
    });
