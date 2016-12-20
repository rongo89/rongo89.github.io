function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function temperatureScale(i){
  if (i < 0) {
    i = 0;
  } 
  return i
}

function timeScale(i){
  if (i >= 5 && i <= 21) {
    if (i <= 16) {
      i = 0 - 4 + i
      i = 25 * i
    } else {
      i = 22 - i
      i = 60 * i
    }
  } else {
    i = 20
  }
  return i
}

function weatherCall() {
  var result
  var obj
  var date = new Date();
  var time = date.getHours()+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds())
  $.ajax({
    type: 'get',
    dataType: 'json',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data: {q: 'Berlin,de', appid: 'd3055751643ca752648752319473b7c0'},
    success: function(result) {
      
      temperature = result.main.temp - 273.15;
      shower_quantity = result.main.humidity
      
      document.getElementById("tempValue").textContent = temperature
      document.getElementById("showValue").textContent = shower_quantity
      document.getElementById("timeValue").textContent = time

      onTemperatureChange(temperatureScale(temperature))
      onTimeChange(timeScale(date.getHours()))
      onShowerQuantityChange(shower_quantity)
    },
    error: function(xhr) {
      console.log(xhr);
    }
  });
}