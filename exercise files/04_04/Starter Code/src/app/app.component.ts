import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators'; // mergeMap allows for multiple data requests to be processed simultaneously, 
                                                  // this would almost put the request in a queue and then process each one 
                                                  // in the request they were made in.


interface Weather {
  city: string;
  temperature: number;
  humidity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayWeather: Weather[] = [];
  citySubject$ = new Subject<string>();

  ngOnInit() {
    this.citySubject$.pipe(mergeMap((city) => {
      return this.getWeather(city).pipe(delay(1000));
    })).subscribe((weather) => {
      this.displayWeather.push(weather);
    })
  }

  submitCity(city: string) {
    this.citySubject$.next(city);
  }

  getWeather(city: string): Observable<Weather> {
    const weatherDataMap: { [key: string]: Weather } = {
      seattle: {
        city: 'Seattle',
        temperature: 73,
        humidity: 41,
      },
      'new york city': {
        city: 'New York City',
        temperature: 73,
        humidity: 41,
      },
      'los angeles': {
        city: 'Los Angeles',
        temperature: 73,
        humidity: 41,
      },
    };

    return of(weatherDataMap[city]);
  }
}
