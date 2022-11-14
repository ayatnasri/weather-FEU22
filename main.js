let lat;                                // Global variable
let long;
let country;
let tempruture;
let weatherDescription;
let feelLike;
let APIKey = "f788b5fc412e548859e20d400c89a0b7";


function getLocationData(){             // The first function : fetch the API to get the latitude & longitude for the Helsingborg stad 
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Helsingborg&limit=1&appid=${APIKey}`)
    .then((respons) => {
        if(respons.ok) {
            return respons.json();      // Convert to JSON document
        }
    })
    .then(data => {                     // Get the location data 
        console.log(data);
        country = `${data[0].name} , ${data[0].country}`;
        lat = data[0].lat;
        long = data[0].lon;

        function getWeatherData(){      // The second function: fetch the API to get the weather data 
            console.log(long);         
            console.log(lat);
            console.log(country);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=metric`)
            .then(respons => respons.json())
            .then(data => {
                console.log(data);
                tempruture = data.main.temp; 
                weather = data.weather[0].description;
                feelLike = data.main.feels_like;

                                        // display the data on the screen DOM

                document.getElementById('region').innerHTML = `${country}` ;
                document.getElementById('temp').innerHTML = `${Math.round(tempruture)}<sup id="celsius">°C</sup>`;
                document.getElementById('description').innerHTML = weather;
                document.getElementById('feelLike').innerHTML = `Feel like : ${(feelLike)}<sup id="FeelLikeCelsius">°C</sup>`;
            })
        }
        getWeatherData();
    })
}
getLocationData()
