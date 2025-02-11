import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../model/task';
import { catchError, map, Observable, pipe, Subject, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  errorSubject = new Subject<HttpErrorResponse>();
  loggingService: LoggingService = inject(LoggingService)

  createTask(data: Task) {
    const headers = new HttpHeaders({ 'my-header': 'hello world' });
    this.http
      .post<{ name: string }>(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json',
        data,
        { headers: headers }
      )
      .pipe(catchError((err) => {
        const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
        this.loggingService.logError(errorObj);
        return throwError(() => err)
      }))
      .subscribe({error: (err) =>{
        this.errorSubject.next(err)
      }});
  }
  deleteTask(id: string | undefined){
    this.http
      .delete(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task/' + id + '.json')
        .pipe(catchError((err) => {
          const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
          this.loggingService.logError(errorObj);
          return throwError(() => err)
        }))
        .subscribe({error: (err) =>{
          this.errorSubject.next(err)
        }});
  }
  deleteAllTasks(){
    this.http
      .delete(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json')
        .pipe(catchError((err) => {
          const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
          this.loggingService.logError(errorObj);
          return throwError(() => err)
        })) 
        .subscribe({error: (err) =>{
          this.errorSubject.next(err)
        }});
  }
  getAllTask(){
    let queryparams = new HttpParams();
    queryparams = queryparams.set('page', 2);
    queryparams = queryparams.set('ietm', 10);


    return this.http.get<{[name: string]: Task}>('https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json',
      {params: queryparams}
    )
    .pipe(map((res) => {
      let tasks = [];
      for(let key in res){
        if(res.hasOwnProperty(key)){
          tasks.push({...res[key], id: key})
        }
      }

      return tasks;
    }), catchError((err) => {
      const errorObj = {statusCode: err.status, errorMessage: err.message, dateTime: new Date()}
      this.loggingService.logError(errorObj);
      return throwError(() => err)
    }))
  }
  updateTask(id: string | undefined , data: Task){
    this.http
      .put(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task/' + id + '.json',
        data)
        .subscribe({error: (err) =>{
          this.errorSubject.next(err)
        }});
  }
  getTaskDetail(id: string | undefined){
    return this.http
      .get(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task/' + id + '.json'
      )
      .pipe(map((res) => {
        let task = {};
        task = {...res, id: id} 

        return task
      }))
  }
}
