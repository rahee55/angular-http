import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../model/task';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { TaskDetailsComponent } from './task-details/task-details.component';


@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule, HttpClientModule, TaskDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit{
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  // allTasks = signal<Task[]>([])
  selectedTask!: Task;
  taskService: TaskService = inject(TaskService)
  currentTaskId: string = '';
  isLoading:boolean = false;
  showTaskDetail: boolean = false; 
  errorMessage: string | null = null
  errorSub!: Subscription;
  currentTask: Task | null = null;


  ngOnInit() {
    this.fetchAllTask()
    this.errorSub = this.taskService.errorSubject.subscribe({next: (httperror) =>{
      this.setErrorMessage(httperror);
    }})
  }
  ngOnDestroy(){
    this.errorSub.unsubscribe();
  }
  closeTaskDetail(){
    this.showTaskDetail = false;
  }

  openCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.editMode = false;

    this.selectedTask = {title:'', desc: '', AssignedTo: '', createdAt: '', priority: '', status: ''}
  }

  editMode: boolean = true;

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  createOrUpdateTask(data: Task){
    if(!this.editMode)
     this.taskService.createTask(data)
    else
     this.taskService.updateTask(this.currentTaskId, data)
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
    this.taskService.getAllTask().subscribe({next: (tasks) => {
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
  showCurrentTaskDetail(id: string | undefined){
    this.showTaskDetail = true;
    this.taskService.getTaskDetail(id).subscribe({
      next: (data: Task) => {
        this.currentTask = data;
      }});
  }
  deleteTask(id: string | undefined){
    this.taskService.deleteTask(id)
  }
  deleteAllTasks(){
    this.taskService.deleteAllTasks();
  }
}
