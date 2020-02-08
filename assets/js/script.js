$("#search-btn").on("click", function (event) {
    
    event.preventDefault();

    var search = $('#search-txt').val();

    var query = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=bed785ee913d61642b01b96cd98d7b6d";

    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        $("#current-city").text(response.name + ', ' + response.sys.country);
        $("#current-temp").text(response.main.temp);
        $("#current-humidity").text(response.main.humidity);
        $("#current-windspeed").text(response.wind.speed);
        $("#current-uv").text(response.sys.id);
    })

});