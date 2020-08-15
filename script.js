const movies = [];
        
// This .on("click") function will trigger the AJAX Call
$("#find-movie").on("click", function(event) {

  // Preventing the submit button from trying to submit the form
  // We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();

  
  // Here we grab the text from the input box
  var movie = $("#movie-input").val().trim();


  // Here we construct our URL
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
  // and display it in the div with an id of movie-view

  // YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE

  // =================================================================

  // CODE GOES HERE
  $.ajax({
      url:queryURL,
      method: "GET"
  }).then(function(response){
      if (response.Error){
        // let msg = $("<h2>");
        let msg = `${movie}: This ${response.Error}`;
        $(".search-list").text(msg);
        $("#movie-info").text(msg);
        $("#movie-view").text(msg);
        // console.log(response.Error);
      }
      else {
          // $("#movie-view").text(JSON.stringify(response));
        // console.log(response.Runtime);
        var newSearch = document.createElement("h5");
        newSearch.textContent = movie;
        $(".search-list").append(newSearch);
        
        displayMovie(response);
      }
    //   
  });


  const displayMovie = (data)=>{
      const actors = data.Actors.split(",");
      
      let html = `
      <div class="card">
          <div class="card-body">
          
          <img src=${data.Poster} class="card-img-top" alt="movie poster">
          <p class="card-text">${data.Plot}</p>
      </div>`
      $("#movie-view").html(html);
      // style="width: 22rem;"
      let ht = `
      <h1 class="card-title text-uppercase">${data.Title}</h1>
      <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="font-weight-bold">Director: </span>${data.Director}</li>
      <li class="list-group-item"><span class="font-weight-bold">Writer: </span>${data.Writer}</li>
      <li class="list-group-item"><span class="font-weight-bold">Genre: </span>${data.Genre}</li>
      <li class="list-group-item"><span class="font-weight-bold">Awards: </span>${data.Awards}</li>
      
      <li class="list-group-item"><span class="font-weight-bold">Rated: </span>${data.Rated}</li>
      <li class="list-group-item"><span class="font-weight-bold">Released: </span>${data.Released}</li>
      <h5 class="card-title">Actors</h5>`
      
     actors.forEach(element => {
          ht += `<li class="list-group-item">${element}</li>`
     });

      ht += ` <ul> `  ;
      
      $("#movie-info").html(ht);

  }

});
