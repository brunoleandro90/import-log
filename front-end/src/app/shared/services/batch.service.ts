import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Batch } from '../models/batch';
import { GenericService } from './generic.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService extends GenericService<Batch>{

  constructor(public http: HttpClient,
    public localStorageService: LocalStorageService) {
    super(http, localStorageService, 'batch')
  }
}
