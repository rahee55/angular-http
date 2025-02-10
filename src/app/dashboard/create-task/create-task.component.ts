import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../model/task';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  @Input() isEditMode: boolean = false;
  @Input() selectedTask!: Task;

  @ViewChild('taskForm') taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  ngAfterViewInit(){
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask)
    }, 0)
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  onFormSubmitted(form: NgForm){
    this.emitTaskData.emit(form.value)
    this.CloseForm.emit(false)
  }
}
