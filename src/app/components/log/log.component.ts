import { Component, OnInit } from '@angular/core';
import {Log} from '../../Models/Logs';
import {LogService} from ".././../services/log.service"

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: Log[];
  selectedLog: Log;
  loading: boolean = false;


  constructor(
    private logService: LogService
  ) {
    this.logs = [];
  }

  ngOnInit(): void {
    this.logService.stateClear.subscribe(clear => {
      if(clear)
      {
        this.selectedLog = {id:'', text:'', date:''}

      }
    })
    this.logService.getLogs().subscribe(allLogs =>{
      this.logs = allLogs;
    })

    this.logService.clearState
  }

  onSelect(log:Log)
  {
    this.logService.setFormLog(log)
    this.selectedLog = log
  }

  deletLog(log:Log)
  {
    if(confirm('Are you sure to delete this log?'))
    {
      this.logService.deleteLog(log);
    }
  }

}
