const api = {
    key: "80a2b51e4fb3cfa3cafcb72b7caec56c",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchBox.value);
        console.log("bingo");
    }

}

function getResult(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);

}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // updating the temperature
    let temp = document.querySelector(".current .temp");
    temp.innerText = `${weather.main.temp}`;
    // updating the weather descriiption
    let atmosphereDescription = document.querySelector(".current .whether");
    atmosphereDescription.innerText = `${weather.weather[0].description}`;
    // updating the min&max temperature
    let hiLow = document.querySelector(".current .hi-low");
    hiLow.innerText = `${weather.main.temp_min}/${weather.main.temp_max}`;

    // updating date
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);
}

function dateBuilder(currentDate) {
    let months = ["January", "February", "March", "April", "May", "june",
        "July", "August", "September", "October", "November", "December"];

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"];

    let day = days[currentDate.getDay()];
    let date = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}