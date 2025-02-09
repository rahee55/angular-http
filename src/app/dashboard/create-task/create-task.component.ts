import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../model/task';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  onFormSubmitted(form: NgForm){
    this.emitTaskData.emit(form.value)
    this.CloseForm.emit(false)
  }
}
