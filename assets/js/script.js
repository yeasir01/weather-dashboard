var recentSearch = [];

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

        const currentIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        $("#weather-icon").html('<img src=' + currentIcon + ' class="current-icon" alt="Weather icon"></img>');
        
        getUvIndex(response);
        fiveDay(search);
        recentSearch.unshift(search); // add search to front of array
        renderButtons(); //re-render buttons from array
    })

});

$(document).on("click", ".city-btn", function (event) {

    event.preventDefault();

    var search = $(this).attr("data-name");
    const dayQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d";

    $.ajax({
        url: dayQuery,
        method: "GET"
    }).then(function (response) {
        $("#current-city").text(response.name + ' (' + response.sys.country + ')');
        $("#current-temp").text(response.main.temp + ' F°');
        $("#current-humidity").text(response.main.humidity + "%");
        $("#current-windspeed").text(response.wind.speed + " MPH");

        const currentIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

        $("#weather-icon").html('<img src=' + currentIcon + ' class="current-icon" alt="Weather icon"></img>');
        
        getUvIndex(response);

        fiveDay(search);
    })

});

function fiveDay(search) {

    const fiveQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d"

    $.ajax({
        url: fiveQuery,
        method: "GET"
    }).then(function (response) {
        //Day 1 moment.unix(response.list[0].dt).format("MM/DD/YYYY")
        $("#day-one-date").text(moment.unix(response.list[7].dt).format("dddd"));
        $("#day-one-temp").text('Temp: ' + response.list[7].main.temp + ' F°');
        $("#day-one-humid").text('Humidity: ' + response.list[7].main.humidity + '%');
        const dayOneIcon = "http://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + "@2x.png";
        $("#day-one-icon").html('<img src=' + dayOneIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 2
        $("#day-two-date").text(moment.unix(response.list[15].dt).format("dddd"));
        $("#day-two-temp").text('Temp: ' + response.list[15].main.temp + ' F°');
        $("#day-two-humid").text('Humidity: ' + response.list[15].main.humidity + '%');
        const dayTwoIcon = "http://openweathermap.org/img/wn/" + response.list[15].weather[0].icon + "@2x.png";
        $("#day-two-icon").html('<img src=' + dayTwoIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 3
        $("#day-three-date").text(moment.unix(response.list[23].dt).format("dddd"));
        $("#day-three-temp").text('Temp: ' + response.list[23].main.temp + ' F°');
        $("#day-three-humid").text('Humidity: ' + response.list[23].main.humidity + '%');
        const dayThreeIcon = "http://openweathermap.org/img/wn/" + response.list[23].weather[0].icon + "@2x.png";
        $("#day-three-icon").html('<img src=' + dayTwoIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 4
        $("#day-four-date").text(moment.unix(response.list[31].dt).format("dddd"));
        $("#day-four-temp").text('Temp: ' + response.list[31].main.temp + ' F°');
        $("#day-four-humid").text('Humidity: ' + response.list[31].main.humidity + '%');
        const dayFourIcon = "http://openweathermap.org/img/wn/" + response.list[31].weather[0].icon + "@2x.png";
        $("#day-four-icon").html('<img src=' + dayFourIcon + ' class="five-day-icon" alt="Weather icon"></img>');
        //Day 5
        $("#day-five-date").text(moment.unix(response.list[39].dt).format("dddd"));
        $("#day-five-temp").text('Temp: ' + response.list[39].main.temp + ' F°');
        $("#day-five-humid").text('Humidity: ' + response.list[39].main.humidity + '%');
        const dayFiveIcon = "http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + "@2x.png";
        $("#day-five-icon").html('<img src=' + dayFiveIcon + ' class="five-day-icon" alt="Weather icon"></img>');
    })

    $('.card-bg').removeClass('hide');
};

function renderButtons() {

    $(".recent").empty();

    for (var i = 0; i < recentSearch.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-light w-100 mb-2 city-btn");
        b.attr("data-name", recentSearch[i]);
        b.text(recentSearch[i]);
        $(".recent").append(b);
    }
}

function getUvIndex(response) {
    
    var lat = response.coord.lat
    var lon = response.coord.lon

    const uvQuery = "http://api.openweathermap.org/data/2.5/uvi?appid=bed785ee913d61642b01b96cd98d7b6d&lat=" + lat +"&lon=" + lon;

    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function (response) {
        $("#current-uv").text(response.value);
    })
    
}