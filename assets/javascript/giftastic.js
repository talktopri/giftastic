$(document).ready(function () {
var topics = ["Chicago","Louisiana","Austin","Nashville","Atlanta","Portland"];

function createBtns() {
  $("#btns").empty();

  for (var i = 0; i < topics.length; i++) {
      var gifButton = $("<button>");

      gifButton.attr("ID", "gifArrayBtns");
      gifButton.attr("class", "btn btn-dark btn-space")
      gifButton.attr("data-button", topics[i]);
      gifButton.text(topics[i]);

      $("#btns").append(gifButton);
  }
}

createBtns();

function renderFavs(favs) {
  $("#gif-favorites").empty();

  for (var i = 0; i < favs.length; i++) {
      var favsImg = $("<img>")
      favsImg.attr("src", favs[i]);
      favsImg.attr("style", "width: 200px; height: 200px")
      favsImg.addClass("btn-space")

      $("#gif-favorites").append(favsImg)
  }
}

$("#add-keyword").click(function () {
  var keywordPush = $("#keyword-term").val().trim();
  topics.push(keywordPush);
  createBtns();
  $("#keyword-term").val("");
})

$(document).on("click", "#gifArrayBtns", function () {
  // var results2;
  // var results3;
  var searchQuery = $(this).attr("data-button");
  var giphyAPIKey = "api_key=UxNR1uNih1F65bA3EEK3M4XZnDrOhr2A";
  // var accuweatherAPIKey = "apikey=uwu2fjRO7VYtbr9dCRkykSPy7wJOn3cF";
  var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?" + giphyAPIKey + "&q=" + searchQuery + "&limit=10";
  // var locationQueryURL = "http://dataservice.accuweather.com/locations/v1/cities/search?q=" + searchQuery + "&" + accuweatherAPIKey;
  // var weatherQueryURL = "https://dataservice.accuweather.com/forecasts/v1/daily/1day/" + results2 + "?" + accuweatherAPIKey;

  $.ajax({
      url: giphyQueryURL,
      method: "GET"
  }).then(function (response) {

    var gifArray = response.data;

    for (var i = 0; i < gifArray.length; i++) {
      var gifDiv = $("<div>");
      gifDiv.addClass("card btn-space mx-auto")
      gifDiv.attr("style", "width: 20em")
      var gifDivBody = $("<div>")
      gifDivBody.addClass("card-body")

      var gifRating = gifArray[i].rating;
      var gifTitle = gifArray[i].title;
      var gifTitleShort = gifTitle.slice(0, 16);

      var title = $("<strong>").text(gifTitleShort.toUpperCase() + "...");
      title.attr("class", "card-title")
      var rating = $("<p>").text("Rating: " + gifRating.toUpperCase());
      rating.attr("class", "card-body")

      var originalDownload = gifArray[i].images.original.url;
      var target = '<a target="_blank"></a>'
      var downloadBtn = $("<a>").text("Download");
      downloadBtn.attr("target", target);
      downloadBtn.attr("href", originalDownload);
      downloadBtn.attr("download", "giphy.gif");
      downloadBtn.addClass("btn btn-primary btn-space");

      var gifAnimate = gifArray[i].images.fixed_height.url
      var gifStill = gifArray[i].images.fixed_height_still.url
      var gifImage = $("<img>");
      gifImage.attr("src", gifStill);
      gifImage.attr("data-still", gifStill)
      gifImage.attr("data-animate", gifAnimate)
      gifImage.attr("data-state", "still")
      gifImage.addClass("card-img-top gif")

      var heartSpan = $("<i>");
      heartSpan.addClass("fas fa-heart");
      heartSpan.attr("aria-hidden", "true")
      heartSpan.attr("span-image", gifAnimate)

        // $.ajax({
        // url: locationQueryURL,
        // method: "GET"
        // })
        // .then(function(response2) {
        //   results2 = response2[0].Key;
        //   console.log("City key" + results2);
          
        //   $.ajax({
        //     url: weatherQueryURL,
        //     method: "GET"
        //   })
        //     .then(function(response3) {
        //       console.log(response3);

            
        //       results3 = response3;

            gifDiv.append(gifImage);
            gifDiv.append(gifDivBody);
            gifDivBody.append(title);
            gifDivBody.append(rating);
            gifDivBody.append(downloadBtn);
            gifDivBody.append(heartSpan)

            $("#gif-body").prepend(gifDiv);
        // });
      // });
    }
  });
});

$(document).on("click", ".fas", function () {
  var favImg = $(this).attr("span-image");
  favs.push(favImg);
  renderFavs(favs);
  localStorage.setItem("favs-array", JSON.stringify(favs));
})

$("#clearFavs").click(function () {
  localStorage.removeItem("favs-array")
  renderFavs(favs)
  favs = []
  $("#gif-favorites").empty();
})

$(document).on("click", "img.gif", function () {
  var state = $(this).attr("data-state");

  if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
  } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still")
  }
})

var favs = JSON.parse(localStorage.getItem("favs-array"));
if (!Array.isArray(favs)) {
  favs = [];
}

renderFavs(favs);


});