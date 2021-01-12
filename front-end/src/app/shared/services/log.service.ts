import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { GenericService } from './generic.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends GenericService<Log> {

  constructor(public http: HttpClient,
              public localStorageService: LocalStorageService) { 
    super(http, localStorageService, 'log');
  }
}
