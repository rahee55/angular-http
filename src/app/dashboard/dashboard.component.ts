import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../model/task';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);

  allTasks: Task[] = [];

  taskServise: TaskService = inject(TaskService)

  ngOnInit() {
    this.fetchAllTask()
  }

  openCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  createTask(data: Task){
    this.taskServise.createTask(data)
  }
  private fetchAllTask(){
    this.taskServise.getAllTask().subscribe((tasks) => {
      this.allTasks = tasks;
    })
  }
  deleteTask(id: string | undefined){
    this.taskServise.deleteTask(id)
  }
  deleteAllTasks(){
    this.taskServise.deleteAllTasks();
  }
}
