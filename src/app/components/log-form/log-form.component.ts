import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';
import {Log} from '../../Models/Logs';
// import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  public text: string | null ;
  public id: string | null;
  date: any = new Date();
  isNew : boolean = true;
  screenWidth: number = window.innerWidth;

  constructor(
    private logService:LogService
  ) {
    this.id =''
    this.text = ''
   }

  ngOnInit(): void {
    console.log(this.logService.selectedLog)
    this.logService.selectedLog.subscribe(log=>{
      if(log.id !==null)
      {
        // console.log(log)
        this.id = log.id
        this.text = log.text;
        this.date = log.date
        this.isNew = false;
      }
    })

  }


  onSubmit() : void
  {
    if(!this.isNew)
    {
      const updateLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.logService.updateLog(updateLog )

    }else{
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      this.logService.addLog(newLog)
    }

   this.clearState()
  }

  clearState()
  {
    this.id = null;
    this.text = null;
    this.date = null;
    this.isNew = true;
    this.logService.clearState();
  }

  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
  }

}
