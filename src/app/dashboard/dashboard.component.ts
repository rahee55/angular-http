import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../model/task';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
  // allTasks = signal<Task[]>([])
  selectedTask!: Task;
  taskServise: TaskService = inject(TaskService)
  currentTaskId: string = '';
  isLoading:boolean = false;
  errorMessage: string | null = null
  



  ngOnInit() {
    this.fetchAllTask()
    this.taskServise.errorSubject.subscribe({next: (httperror) =>{
      this.setErrorMessage(httperror);
    }})
  }

  openCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;

    this.selectedTask = {title:'', desc: '', AssignedTo: '', createrAt: '', priority: '', status: ''}
  }

  editMode: boolean = true;

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  createOrUpdateTask(data: Task){
    if(!this.editMode)
     this.taskServise.createTask(data)
    else
     this.taskServise.updateTask(this.currentTaskId, data)
  }
  onEditTask(id: string | undefined){

    if (id) {
      this.currentTaskId = id;
    }
    this.showCreateTaskForm = true;
    this.editMode = true;
    const task = this.allTasks.find((task) => task.id === id);
    if (task) {
      this.selectedTask = task;
    }
  }
  fetchAllTasksClick(){
    this.fetchAllTask();
  }
  private fetchAllTask(){
    this.isLoading = true;
    this.taskServise.getAllTask().subscribe({next: (tasks) => {
      this.allTasks = tasks;
      this.isLoading = false;
    }, error: (error) => {
      this.errorMessage = error.message
      this.setErrorMessage(error)
      this.isLoading = false;
      setTimeout(() =>{
        this.errorMessage = null;
      }, 3000);
    }} )
  }
  private setErrorMessage(err: HttpErrorResponse){
    if(err.error.error === "Permission denied"){
      this.errorMessage = 'You do not have permisson to perform this action';
    }else{
      this.errorMessage = err.message;
    }
  }
  deleteTask(id: string | undefined){
    this.taskServise.deleteTask(id)
  }
  deleteAllTasks(){
    this.taskServise.deleteAllTasks();
  }
}
