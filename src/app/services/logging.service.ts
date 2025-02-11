import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  http: HttpClient = inject(HttpClient);

  logError(data: {statusCode: number, errorMessage: string, dateTime: Date}){
    this.http.post('https://angularhttpclient-e952b-default-rtdb.firebaseio.com/log.json', data)
    .subscribe();
  }
  
  fetchError(){
    this.http.get('https://angularhttpclient-e952b-default-rtdb.firebaseio.com/log.json')
    .subscribe((data) => {
      console.log(data);
    });
  }
}
