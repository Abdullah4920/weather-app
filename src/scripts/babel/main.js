"use strict";!function(){function t(t){for(var e=new Skycons({color:"#333"}),a=document.getElementsByClassName("canvas"),i=0;i<a.length;i++)e.add(a[i],t[i]);e.play()}function e(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){m.city.latitude=t.coords.latitude,m.city.longitude=t.coords.longitude,a("https://maps.googleapis.com/maps/api/geocode/json?latlng="+m.city.latitude+","+m.city.longitude+"&key=AIzaSyD1i1YJ34RoVggnitqt4KQ5E4OqjN6XdmA","geolocation")}):$.ajax({url:"http://ipinfo.io",dataType:"jsonp",success:function(t){m.city.longitude=t.loc.split(",")[1],m.city.latitude=t.loc.split(",")[0]}}).done(function(){a("https://maps.googleapis.com/maps/api/geocode/json?latlng="+m.city.latitude+","+m.city.longitude+"&key=AIzaSyD1i1YJ34RoVggnitqt4KQ5E4OqjN6XdmA","ip")})}function a(t,e){$.ajax({url:t,success:function(t){"search"==e?m.city.address=t.results[0].formatted_address:m.city.address=t.results[0].address_components[t.results[0].address_components.length-2].long_name+", "+t.results[0].address_components[t.results[0].address_components.length-1].long_name,m.city.longitude=t.results[0].geometry.location.lng,m.city.latitude=t.results[0].geometry.location.lat}}).done(function(){i()})}function i(){var t=m.city.longitude,e=m.city.latitude,a="https://api.darksky.net/forecast/8877941a6145fd159c584b8f95b52bb9/"+e+","+t+"?callback=?";$.ajax({url:a,dataType:"jsonp",success:function(t){m.weatherForecast=t}}).done(function(){s(m.weatherForecast)})}function s(e){$(".today-grid, .tomorrow, .later").empty(),n(e.currently),o(e.hourly),c(e.daily),t(m.icons)}function n(t){$(".location").text(m.city.address),$(".temperature").text(l(t.temperature)),$(".description").text(t.summary),$(".humidity").text("Humidity: "+(100*t.humidity).toFixed(0)+"%"),$(".wind").text("Wind: "+t.windSpeed+" m/s"),$(".pressure").text("Pressure: "+t.pressure+" hPa"),$(".local-time").text("Local Time: "+u(t.time).time),m.icons.push(t.icon)}function o(t){for(var e=1;e<48-u(m.weatherForecast.currently.time).time.slice(0,2);e++){var a={temperature:"Temperature: "+l(t.data[e].temperature),description:t.data[e].summary,wind:"Wind: "+t.data[e].windSpeed+" m/s",pressure:"Pressure: "+t.data[e].pressure+" hPa",humidity:"Humidity: "+(100*t.data[e].humidity).toFixed(0)+"%",date:u(t.data[e].time).fullDate,time:u(t.data[e].time).time,currentDay:u(t.data[e].time).currentDay,icon:t.data[e].icon};m.icons.push(a.icon);var i=u(m.weatherForecast.currently.time).fullDate.slice(0,2),s=parseInt(i)==a.date.slice(0,2)?".today-grid":".tomorrow";d(a,s)}}function c(t){for(var e=2;e<=7;e++){var a={temperature:"Temperature: "+l(t.data[e].temperatureMin)+" - "+l(t.data[e].temperatureMax),description:t.data[e].summary,wind:"Wind: "+t.data[e].windSpeed+" m/s",pressure:"Pressure: "+t.data[e].pressure+" hPa",humidity:"Humidity: "+(100*t.data[e].humidity).toFixed(0)+"%",date:u(t.data[e].time).fullDate,time:u(t.data[e].time).time,currentDay:u(t.data[e].time).currentDay,icon:t.data[e].icon};m.icons.push(a.icon),d(a,".later")}}function d(t,e){$(e).append('<div class="mdl-grid tab-row"><div class="mdl-cell mdl-cell--3-offset-desktop mdl-cell--6-col"><div class="mdl-card weather-card mdl-shadow--2dp"><div class="mdl-grid full-width"><div class="mdl-cell mdl-cell--6-col"><div class="basic-weather-info"><div class="main-info"><span class="date">'+t.currentDay+" "+t.date+" - "+t.time+'</span><span class="description">'+t.description+'</span></div><span class="temperature">'+t.temperature+'</span><span class="wind">'+t.wind+'</span><span class="pressure">'+t.pressure+'</span><span class="humidity">'+t.humidity+'</span></div></div><div class="mdl-cell mdl-cell--6-col"><div class="animated-icon"><canvas class="canvas" width="200" height="200"></canvas></div></div></div></div></div></div>')}function r(t){a("https://maps.googleapis.com/maps/api/geocode/json?address="+t+"&key= AIzaSyD1i1YJ34RoVggnitqt4KQ5E4OqjN6XdmA","search")}function l(t){return $(".celsius").is(":checked")?((t-32)*(5/9)).toFixed(0)+"°C":t.toFixed(0)+"F"}function u(t){var e=new Date(1e3*t),a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i=a[e.getDay()],s=e.getFullYear(),n=("0"+(e.getMonth()+1)).slice(-2),o=("0"+e.getDate()).slice(-2),c=("0"+e.getHours()).slice(-2),d=("0"+e.getMinutes()).slice(-2);("0"+e.getSeconds()).slice(-2);return{currentDay:i,fullDate:o+"."+n+"."+s,time:c+":"+d}}$(document).ajaxStart(function(){$(".loading-indicator").fadeIn()}),$(document).ajaxStop(function(){$(".loading-indicator").fadeOut()});var m={city:{address:void 0,longitude:0,latitude:0},weatherForecast:{},icons:[]};e(),$("#search-form").on("submit",function(t){t.preventDefault();var e=$("#search-field").val().trim();r(e),document.querySelector("#search-form").reset(),document.querySelector("#dialog").close()}),$(".search-button").click(function(t){t.preventDefault(),$("#search-form").submit()}),$("#refresh-weather").click(function(t){t.preventDefault(),i(m.city.longitude,m.city.latitude)}),$(".celsius, .fahrenheit").on("click",function(){i(m.city.longitude,m.city.latitude)}),function(){var t=document.querySelector("#dialog");t.showModal||dialogPolyfill.registerDialog(t),$("#search-icon").click(function(e){t.showModal()}),$(".dialog-close").click(function(e){t.close()})}()}();