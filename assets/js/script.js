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

        const currentIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        $("#weather-icon").html('<img src=' + currentIcon + ' class="current-icon" alt="Weather icon"></img>');

        fiveDay(search);
    })

});

function fiveDay(search) {

    const fiveQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d"

    $.ajax({
        url: fiveQuery,
        method: "GET"
    }).then(function (response) {
        //Day 1
        $("#day-one-date").text(response.list[0].dt);
        $("#day-one-temp").text('Temp: ' + response.list[0].main.temp + ' F°');
        $("#day-one-humid").text('Humidity: ' + response.list[0].main.humidity + '%');
        const dayOneIcon = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
        $("#day-one-icon").html('<img src=' + dayOneIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 2
        $("#day-two-date").text(response.list[1].dt);
        $("#day-two-temp").text('Temp: ' + response.list[1].main.temp + ' F°');
        $("#day-two-humid").text('Humidity: ' + response.list[1].main.humidity + '%');
        const dayTwoIcon = "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png";
        $("#day-two-icon").html('<img src=' + dayTwoIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 3
        $("#day-three-date").text(response.list[2].dt);
        $("#day-three-temp").text('Temp: ' + response.list[2].main.temp + ' F°');
        $("#day-three-humid").text('Humidity: ' + response.list[2].main.humidity + '%');
        const dayThreeIcon = "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png";
        $("#day-three-icon").html('<img src=' + dayTwoIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 4
        $("#day-four-date").text(response.list[3].dt);
        $("#day-four-temp").text('Temp: ' + response.list[3].main.temp + ' F°');
        $("#day-four-humid").text('Humidity: ' + response.list[3].main.humidity + '%');
        const dayFourIcon = "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png";
        $("#day-four-icon").html('<img src=' + dayFourIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 5
        $("#day-five-date").text(response.list[4].dt);
        $("#day-five-temp").text('Temp: ' + response.list[4].main.temp + ' F°');
        $("#day-five-humid").text('Humidity: ' + response.list[4].main.humidity + '%');
        const dayFiveIcon = "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png";
        $("#day-five-icon").html('<img src=' + dayFiveIcon + ' class="five-day-icon" alt="Weather icon"></img>');
    })
};