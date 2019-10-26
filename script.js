$(document).ready(function () {
    var appID = "9ebf11cb2c5cda468f63c5e3c43699b4";
    var cardA = $('#weatherCardA');
    var cardB = $('#weatherCardB');
    var cardC = $('#weatherCardC');
    var cardD = $('#weatherCardD');
    var cardE = $('#weatherCardE');

    var fiveDayArray = [cardA, cardB, cardC, cardD, cardE];


    $(".query_btn").click(function () {
        var query_param = $(this).prev().val();
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;

        console.log(queryURL);
        if ($(this).prev().attr("placeholder") == "City") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        } else if ($(this).prev().attr("placeholder") == "Zip Code") {
            var weather = "http://api.openweathermap.org/data/2.5/weather?zip=" + query_param + "&APPID=" + appID;
        }


        $.getJSON(weather, function (json) {
            $("#city").html(json.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");

            // Converting to Fahrenheit

            var farTemp = parseInt((((json.main.temp) - 273) * 9 / 5 + 32));
            $("#temperature").html(farTemp);
            $("#humidity").html(json.main.humidity);
            $("#wind").html(json.wind.speed);
            $("#date").html(moment().format("MMM Do YY"));

            var cityID = json.id;
            // Getting 5 day forecast
            var fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=" + appID;


           
            $.getJSON(weather, function (response) {

                for (i = 0; i < 6; i++) {

                    var iconIMG = $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    fiveDayArray[i].find("#dateTime").html(response.list[i].dt_txt);
                    fiveDayArray[i].find("#humidity").html(response.list[i].main.humidity);
                    fiveDayArray[i].find("#Temperature").html(parseInt((((response.list[i].main.temp) - 273) * 9 / 5 + 32)));
                    fiveDayArray[i].find("#weather_image").html(iconIMG);
                }


            });

        })

    })
});