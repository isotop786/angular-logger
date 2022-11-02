import { Injectable } from '@angular/core';
import {Log} from '../Models/Logs'
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs'
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null})
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true)
  stateClear = this.stateSource.asObservable();

  constructor() {
  this.logs = [];
    // this.logs = [
    //   {
    //     id: '1',
    //     text:"Build UI",
    //     date: new Date('12/23/2002 12:54:23')
    //   },
    //   {
    //     id: '2',
    //     text:"Add Bootstrap to the UI",
    //     date: new Date('12/24/2002 1:43:32')
    //   },
    //   {
    //     id: '3',
    //     text:"Integrate with API",
    //     date: new Date('12/23/2002 23:12:23')
    //   },
    // ]

   }

   getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') == null)
    {
      this.logs = []
    }
    else
    {
      this.logs = JSON.parse(localStorage.getItem('logs')|| '[]');
    }
    return of(this.logs.sort((a,b)=>{
      return b.date = a.date
    }));

    // return of(this.logs)
   }

   setFormLog(log: Log)
   {
    this.logSource.next(log);
   }

   addLog(log : Log): void{
      this.logs.unshift(log)
      localStorage.setItem('logs',JSON.stringify(this.logs))
      // return of(log)
   }
   updateLog(log : Log)
   {
    console.log("service loggin: "+log)
    this.logs.forEach((logItem,index) =>{
      if(log.id === logItem.id)
      {
        console.log(index)
         this.logs.splice(index, 1)
         localStorage.setItem('logs',JSON.stringify(this.logs))
        // this.logs.unshift(log)
      }
    })
    if(log.id !== null)
    {
      console.log('adding '+log.id)
      this.logs.unshift(log)
      localStorage.setItem('logs',JSON.stringify(this.logs))

    }
  }

  deleteLog(log: Log)
  {
    this.logs.forEach((logItem, index)=>{
      if(log.id === logItem.id)
      {
        this.logs.splice(index, 1);
      }
    })

    localStorage.setItem('logs',JSON.stringify(this.logs))
  }

  clearState()
  {
    this.stateSource.next(true)
  }

}
