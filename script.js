class fetchedForecastApi {
  constructor() {
    this.dataApiUrl = "https://www.metaweather.com/api/location/";
    this.searchApiDataUrl = `${this.dataApiUrl}/search`;
    this.addCorsHeader();
  }
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
    $.getJSON(this.searchApiDataUrl, { query: "toronto" }).done((data) =>
      this.getWeatherData(data[0].woeid)
    );
  }

  getWeatherData(location) {
    $.getJSON(`${this.dataApiUrl}/${location}`).done((data) =>
      console.log("The weather data is:", data)
    );
  }
}
class requestControl {
  constructor() {
    this.fetchedForecastApi = new fetchedForecastApi();
    this.init();
  }

  init() {
    this.fetchedForecastApi.getLocation();
  }
}

const request = new requestControl();
