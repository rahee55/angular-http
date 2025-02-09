import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../model/task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  http: HttpClient = inject(HttpClient);

  createTask(data: Task) {
    const headers = new HttpHeaders({ 'my-header': 'hello world' });
    this.http
      .post<{ name: string }>(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json',
        data,
        { headers: headers }
      )
      .subscribe((data) => console.log(data));
  }
  deleteTask(id: string | undefined){
    this.http
      .delete<{ name: string }>(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task/' + id + '.json').subscribe()
  }
  deleteAllTasks(){
    this.http
      .delete(
        'https://angularhttpclient-e952b-default-rtdb.firebaseio.com/task.json')
        .subscribe();
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
}
