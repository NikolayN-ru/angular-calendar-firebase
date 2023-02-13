import { TasksService } from './../../services/tasks.service';
import { DateService } from 'src/app/services/date-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/services/tasks.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-organazer',
  templateUrl: './organazer.component.html',
  styleUrls: ['./organazer.component.scss'],
})
export class OrganazerComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = [];
  constructor(
    public dateService: DateService,
    public tasksService: TasksService
  ) {}

  ngOnInit() {
    this.dateService.date
      .pipe(switchMap((value) => this.tasksService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    this.tasksService.create(task).subscribe(
      (task) => {
        // console.log(task, 'task!');
        this.tasks.push(task);
        this.form.reset();
      },
      (err) => console.error(err)
    );
    // console.log(title);
  }

  removeTask(task: Task) {
    this.tasksService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (err) => console.error(err)
    );
  }
}
