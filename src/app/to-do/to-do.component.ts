import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ITasks } from '../Models/tasks';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  todoForm !: FormGroup;

  tasks: ITasks[] = [];
  inProgress: ITasks[] = [];
  done: ITasks[] = [];

  updateIndex!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });

    this.todoForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
  }

  editTask(item: ITasks, i: number) {
    this.todoForm.controls['item'].setValue(item.description);

    this.updateIndex = i;

    this.isEditEnabled = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;

    this.tasks[this.updateIndex].done = false;

    this.todoForm.reset();

    this.updateIndex = undefined;

    this.isEditEnabled = false;
  }

  drop(event: CdkDragDrop<ITasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



}
