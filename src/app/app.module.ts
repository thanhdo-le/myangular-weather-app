import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

const appRoutes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherComponent },
  { path: 'city-detail', component: CityDetailComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CityDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ButtonModule,
    InputTextModule,
    CardModule,
    PanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
