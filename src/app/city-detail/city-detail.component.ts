import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather/weather-data.interface';
import { WeatherForecastData } from './weather-forecast-data.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  weather!: WeatherData;
  weatherForecast!: WeatherForecastData;
  myWeather: any;
  temperature: number = 0;
  tempMin:number = 0;
  tempMax:number = 0;
  feelsLikeTemp : number = 0;
  humidity: number = 0;
  pressure: number = 0;
  wind:number = 0;
  summary: string = '';
  description:string = '';
  mainDes:string = '';
  iconURL: string = '';
  city: string = 'Hanoi';
  units:string = "metric";
  sunRise:string = '';
  sunSet:string = ''
  weatherData: any[] = [];
  forecastData:any[] = [];
  hourlyForecastData:any[] = [];

  constructor(private weatherService: WeatherService, private router:ActivatedRoute) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.getWeatherData(city);
        this.getNext5HourWeather(city);
      }
    });
  }

  private getWeatherData(city: string): void {
    this.weatherService.getWeather(city).subscribe({
      next: (res: any) => {
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
        // console.log(this.weatherData);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete')
    });
}

private getNext5HourWeather(city: string): void {
  this.weatherService.getWeather(city).subscribe({
    next: (res: any) => {
      const forecastData = res.forecast.forecastday[0].hour;
      if (Array.isArray(forecastData)) {
        const currentTime = new Date().getTime();
        const next5HoursForecast = forecastData.filter((hour: any) => {
          const forecastTime = new Date(hour.time).getTime();
          const timeDifference = forecastTime - currentTime;
          const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
          return timeDifferenceInHours >= 0 && timeDifferenceInHours <= 5;
        });
        if (next5HoursForecast.length > 0) {
          const forecastTime = new Date(next5HoursForecast[0].time);
          next5HoursForecast[0].formattedTime = forecastTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
        }
        for(let i = 0; i < next5HoursForecast.length; i++){
          const weatherForecastData: WeatherForecastData =  {
            time: next5HoursForecast[i].time,
            temperature: next5HoursForecast[i].temp_c,
            iconURL: "https:" + next5HoursForecast[i].condition.icon,
            chanceOfRain: next5HoursForecast[i].chance_of_rain,
          }
        // console.log(weatherForecastData);
        this.hourlyForecastData.push(weatherForecastData);
          console.log(next5HoursForecast);
        }
        console.log(this.hourlyForecastData)
      } else {
        console.log('Invalid forecast data');
      }
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => console.log('complete')
  });
}

}
