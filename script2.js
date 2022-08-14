//API KEY: b6642d49abff4d718f7c821fe5a8f85d
//For websit: https://apidocs.covidactnow.org/

//current data
statedata = 'https://api.covidactnow.org/v2/states.json?apiKey=YOUR_KEY_HERE'
countydata = 'https://api.covidactnow.org/v2/counties.json?apiKey=YOUR_KEY_HERE'
metrodata = 'https://api.covidactnow.org/v2/cbsas.json?apiKey=YOUR_KEY_HERE'

//historicaldata
statedata2 = 'https://api.covidactnow.org/v2/states.timeseries.json?apiKey=YOUR_KEY_HERE'
countydata2 = 'https://api.covidactnow.org/v2/counties.timeseries.json?apiKey=YOUR_KEY_HERE'
metrodata2 = 'https://api.covidactnow.org/v2/cbsas.timeseries.json?apiKey=YOUR_KEY_HERE'

//specific state
statedata0 = 'https://api.covidactnow.org/v2/state/{state}.json?apiKey=YOUR_KEY_HERE'
countydata0 = 'https://api.covidactnow.org/v2/county/{fips}.json?apiKey=YOUR_KEY_HERE'
metrodata0 = 'https://api.covidactnow.org/v2/cbsa/{cbsa_code}.json?apiKey=YOUR_KEY_HERE'

//test https://api.covidactnow.org/v2/state/MD.json?apiKey=b6642d49abff4d718f7c821fe5a8f85d
// https://api.covidactnow.org/v2/states.json?apiKey=b6642d49abff4d718f7c821fe5a8f85d
let covid = {
    apiKey: "b6642d49abff4d718f7c821fe5a8f85d",
    fetchState: function(state){
        fetch(
            "https://api.covidactnow.org/v2/state/" +
              state +
              ".json?apiKey=" +
              this.apiKey
          )
          .then((response) => {
            if (!response.ok) {
              alert("Invalid parameter");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayStats(data));
      },
      displayStats: function (data) {
        const { state } = data;
        const { population } = data;
        var pop = population.toLocaleString("en-US");
        const { newCases } = data.actuals;
        var commas = newCases.toLocaleString("en-US");
        const { deaths } = data.actuals;
        var commasd = deaths.toLocaleString("en-US");
        const { weeklyNewCasesPer100k } = data.metrics;
        document.querySelector(".state").innerText = "Covid stats in " + state + ":";
        document.querySelector(".pop").innerText = "Population:  " + pop;
        document.querySelector(".cases").innerText = "Daily Cases: " + commas;
        document.querySelector(".deaths").innerText = "Total Deaths: " + commasd;
        document.querySelector(".newcases").innerText = "Weekly New Cases: " + weeklyNewCasesPer100k + "/100k residents";
      },
      search: function () {
        this.fetchState(document.querySelector(".search-bar2").value);
      },
    };
    
    document.querySelector(".button2").addEventListener("click", function () {
        covid.search();
      });
 
    document
        .querySelector(".search-bar2")
        .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            covid.search();
        }
        });
    
    covid.fetchState("MD");
