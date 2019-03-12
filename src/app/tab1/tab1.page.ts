import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../services/task.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public tasks: Task[];
  
  // deffault
  task: Task;
  taskId = null;

  updatedTask:boolean = false;

  constructor(private taskService: TaskService, private loadingController: LoadingController) {
    // this.tasks = [
    //   new Task("Sleep well", '10:00:00', '12:30:00'),
    //   new Task("Haha well", '11:00:00', '12:30:00'),
    //   new Task("Nono well", '10:30:00', '12:30:00'),
    // ];
  }

  ionViewDidLoad() { }

  ngOnInit() {
    this.loadTasks();
  }

  // async loadTask() {
  //   const loading = await this.loadingController.create({
  //     message: 'Loading task..'
  //   })
  //   await loading.present();

  //   this.taskService.getTask(this.taskId).subscribe(res => {
  //     this.task = res;
  //     loading.dismiss();
  //   })
  // }

  async loadTasks() {
    const loading = await this.loadingController.create({
      message: 'Loading task..'
    })
    await loading.present();

    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      loading.dismiss();
    })
  }
  
  async saveTask() {
    const loading = await this.loadingController.create({
      message: 'Saving task..'
    })
    await loading.present();

    if(this.taskId) {
      this.taskService.updateTask(this.task, this.taskId).then(() => {
        loading.dismiss();
        this.updatedTask = false;
      });
    } else {
      this.taskService.addTask(this.task).then(() => {
        loading.dismiss();
      });
    }
  }

  addTask() {
    let now = new Date();
    let nowTime = now.toTimeString().split(' ')[0];

    now.setHours(now.getHours() + 1);
    let afterHour = now.toTimeString().split(' ')[0];

    console.log({ nowTime, afterHour });

    // this.tasks.push(new Task("New task", nowTime, afterHour))
    // let tempTask = new Task("New task", nowTime, afterHour);
    // this.task = {
    //   title: tempTask.title, 
    //   startTime: tempTask.startTime, 
    //   endTime: tempTask.endTime,
    //   timeNeeded: tempTask.timeNeeded 
    // };

    this.taskId = null; // so it doesn't update the old one
    this.task = {
      title: "New task", 
      startTime: nowTime, 
      endTime: afterHour,
      timeNeeded: Task.setTimeNeeded(nowTime, afterHour)
    };
    this.saveTask();
  }

  editTask(task) {
    console.log(task);
  }

  // deleteTask(task) {
  //   this.tasks = this.tasks.filter(i => i.title != task.title);
  // }

  deleteTask(task) {
    this.taskService.removeTask(task.id);
  }

  updateTimeNeeded(task: Task) {
    console.log(task);
    task.timeNeeded = Task.setTimeNeeded(task.startTime, task.endTime);
    this.showSaveButton(task);
  }

  showSaveButton(task) {
    this.updatedTask = true;
    this.task = task;
    this.taskId = task.id;
  }
}
