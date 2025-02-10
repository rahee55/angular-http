import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../model/task';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  errorSubject = new Subject<HttpErrorResponse>();

  createTask(data: Task) {
    const headers = new HttpHeaders({ 'my-header': 'hello world' });
    this.http
      .post<{ name: string }>(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json',
        data,
        { headers: headers }
      )
      .subscribe({error: (err) =>{
        this.errorSubject.next(err)
      }});
  }
  deleteTask(id: string | undefined){
    this.http
      .delete<{ name: string }>(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task/' + id + '.json')
        .subscribe({error: (err) =>{
          this.errorSubject.next(err)
        }});
  }
  deleteAllTasks(){
    this.http
      .delete(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json')
        .subscribe({error: (err) =>{
          this.errorSubject.next(err)
        }});
  }
  getAllTask(){
    return this.http.get<{[name: string]: Task}>('https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json')
    .pipe(map((res) => {
      let tasks = [];
      for(let key in res){
        tasks.push({...res[key], id: key})
      }

      return tasks;
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
}
