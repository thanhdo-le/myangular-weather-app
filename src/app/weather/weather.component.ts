import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from './weather-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp : number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = 'Hanoi';
  units:string = "metric";
  wind:number = 0;
  sunRise:string = '';
  sunSet:string = '';
  weatherData: any[] = [];

  constructor(private weatherService: WeatherService, private router: Router){}

  ngOnInit(): void {
    this.weatherData = JSON.parse(localStorage.getItem('weatherData') || '[]');
  }
  onSubmit(): void {
    if (this.city.trim() !== '') {
      this.getWeatherData(this.city);
      this.city = ''; // Clear the search input after submitting
    }
  }
  private getWeatherData(city: string): void {
    this.weatherService.getWeather(city).subscribe(
      (res: any) => {
        const weather: WeatherData = {
          city: city,
          temperature: res.current.temp_c,
          tempMax: res.forecast.forecastday[0].day.maxtemp_c,
          tempMin: res.forecast.forecastday[0].day.mintemp_c,
          feelsLikeTemp: res.current.feelslike_c,
          humidity: res.current.humidity,
          pressure: res.current.pressure_mb,
          summary: res.current.condition.text,
          wind: res.current.wind_kph,
          sunRise: res.forecast.forecastday[0].astro.sunrise,
          sunSet: res.forecast.forecastday[0].astro.sunset,
          description: res.forecast.forecastday[0].day.condition.text,
          mainDes: res.current.condition.text,
          iconURL: 'https:' + res.forecast.forecastday[0].day.condition.icon,
        };
        this.weatherData.push(weather);
        localStorage.setItem('weatherData', JSON.stringify(this.weatherData));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelect(city: string) {
  this.router.navigate(['/city-detail'], { queryParams: { city: city } });
}

clearLocalStorage(): void {
  localStorage.clear();
  window.location.reload();
}
}
