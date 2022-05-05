const dataApiUrl = "https://www.metaweather.com/api/location/";
const searchApiDataUrl = `${dataApiUrl}/search`;

class requestControl {
  addCorsHeader() {
    //Bypass the Cors restriction on the web
    $.ajaxPrefilter((options) => {
      if (options.crossDomain && $.support.cors) {
        options.url =
          "https://the-ultimate-api-challenge.herokuapp.com/" + options.url;
      }
    });
  }

  getLocation() {
    this.addCorsHeader();
    $.getJSON(searchApiDataUrl, { query: "toronto" }).done((data) => this.getWeatherData(data[0].woeid));
  }

  getWeatherData(location){
    $.getJSON(`${dataApiUrl}/${location}`).done(data => console.log('The weather data is:', data));
  }
}

const request = new requestControl();
request.getLocation();
