import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city:string) {
    // return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f149dc01cbf8045b0b7d4a919408e306&units=metric');
    return this.http.get('https://api.weatherapi.com/v1/forecast.json?key=55c97cb960c94138a1695923231805&q=' + city);
  }

}
