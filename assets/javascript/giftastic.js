var topics = ["Chicago","New York","Los Angeles","San Francisco","Louisiana","Austin","Nashville","Atlanta","Portland","Sioux Falls"];

$(document).ready(function() {

  function createButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
      var btn = $("<button>");
        btn.addClass("gif");
          btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
              $("#buttons-view").append(btn);
    }
  }

  createButtons();

  $("#add-city").on("click", function(event) {
    event.preventDefault();
      var cityGif = $("#city-input").val().trim();
        topics.push(cityGif);
        $("#city-input").val('');
          createButtons();
  });

  // function getForecast () {
  //   var queryURL3 = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/" + results2 + "?apikey=uwu2fjRO7VYtbr9dCRkykSPy7wJOn3cF"
  //   console.log(queryURL3);
  // }



  $("#buttons-view").on("click", ".gif", function(event) {
    event.preventDefault();
    var selectedCity = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedCity + "&api_key=UxNR1uNih1F65bA3EEK3M4XZnDrOhr2A&limit=10";
    console.log("Query " + queryURL);
    var queryURL2 = "http://dataservice.accuweather.com/locations/v1/cities/search?q=" + selectedCity + "&apikey=uwu2fjRO7VYtbr9dCRkykSPy7wJOn3cF";
    var queryURL3 = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/" + results2 + "?apikey=uwu2fjRO7VYtbr9dCRkykSPy7wJOn3cF"
    var results;
    var results2;
    var results3;
 

    console.log("Query " + queryURL2);
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            results = response.data;
          
            console.log(results);
  
            for (var i = 0; i < results.length; i++) {
              var rating = results[i].rating;
              var title = results[i].title;
              var weather = $("<p>");
              var totalSeasons;
  
              var ratingParagraph = $("<p>").text("Rating: " + rating );
              var titleParagraph = $("<p>").text("Title: " + title );
  
              var cityImage = $("<img>");
              cityImage.attr("src", results[i].images.fixed_height_still.url);
              cityImage.attr("alt", title);

        $.ajax({
          url: queryURL2,
          method: "GET"
        })
          .then(function(response2) {
            results2 = response2[0].Key;
            console.log("City key" + results2);
            
          $.ajax({
            url: queryURL3,
            method: "GET"
          })
            .then(function(response3) {
              console.log(response3);
  
            
              results3 = response3;
                   


            });

          
          });
      } 
    }); 
    });
  });  
  
//this function makes the gif move when there is a mouse hover.
//$("document").on("click", "img", function() {
    $("#gifs img").hover(function() {
      var src = $(this).attr("src");
    if($(this).hasClass('playing')){
       //stop
       $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
       $(this).removeClass('playing');
    } else {
      //play
      $(this).addClass('playing');
      $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
  });

