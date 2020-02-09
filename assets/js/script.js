$("#search-btn").on("click", function (event) {

    event.preventDefault();

    var search = $('#search-txt').val();
    const dayQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d";


    $.ajax({
        url: dayQuery,
        method: "GET"
    }).then(function (response) {
        $("#current-city").text(response.name + ' (' + response.sys.country + ')');
        $("#current-temp").text(response.main.temp + ' F°');
        $("#current-humidity").text(response.main.humidity + "%");
        $("#current-windspeed").text(response.wind.speed + " MPH");
        $("#current-uv").text(response.sys.id);

        const iconLink = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        $("#weather-icon").html('<img src=' + iconLink + ' class="current-icon" alt="Weather icon"></img>');

        fiveDay(search);
    })

});

function fiveDay(search) {

    const fiveQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d"

    $.ajax({
        url: fiveQuery,
        method: "GET"
    }).then(function (response) {
        $("#day-one-date").text(response.list[0].dt);
        $("#day-one-temp").text('Temp: ' + response.list[0].main.temp + ' F°');
        $("#day-one-humid").text('Humidity: ' + response.list[0].main.humidity + '%');

    })
};