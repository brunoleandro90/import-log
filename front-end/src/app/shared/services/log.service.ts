import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Log } from '../models/log';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LogService extends BaseService {

  constructor(public http: HttpClient) { super(); }

  getAll(): Observable<Log[]> {
    return this.http
      .get<Log[]>(this.UrlServiceV1 + "log", this.generateAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getById(id: string): Observable<Log> {
    return this.http
      .get<Log>(this.UrlServiceV1 + "log/" + id, super.generateAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  create(log: Log): Observable<Log> {
    return this.http
      .post(this.UrlServiceV1 + "log", log, this.generateAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  update(log: Log): Observable<Log> {
    return this.http
      .put(this.UrlServiceV1 + "log/" + log.id, log, super.generateAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  delete(id: string): Observable<Log> {
    return this.http
      .delete(this.UrlServiceV1 + "log/" + id, super.generateAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }
}
