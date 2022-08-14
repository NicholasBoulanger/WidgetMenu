let weather = {
    apiKey: "a21dc499625705ab6f77f9324bfcb6b5",
    // https://api.openweathermap.org/data/2.5/weather?q=Rockville&units=metric&appid=a21dc499625705ab6f77f9324bfcb6b5
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { timezone } = data;
      //const { country } = data.country[0];
      var today = new Date();
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var seconds = today.getSeconds();
      var period = "am";
      utchour = hours + 7;
      currenthour = utchour + timezone/3600;
      if (minutes<10){
        minutes="0"+minutes;
      }
      if (seconds<10){
        seconds="0"+seconds;
      }
      if (currenthour>24){
        currenthour = currenthour-24;
      }
      if (currenthour>12){
        currenthour=currenthour-12;
        period = "pm"
      }
      document.querySelector(".time").innerText = "Local Time: " + currenthour + ":" + minutes + ":" + seconds + " " + period;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".tempc").innerText = temp.toFixed(1) + " °C";
      var farenheit = temp * 9 / 5 + 32;
      document.querySelector(".tempf").innerText = farenheit.toFixed(1) + " °F";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Rockville, Maryland");
