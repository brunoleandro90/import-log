import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Batch } from '../models/batch';
import { BaseService } from './base.service';

@Injectable()
export class BatchService extends BaseService {

  constructor(public http: HttpClient) { super() }

  getAll(): Observable<Batch[]> {
    return this.http
      .get<Batch[]>(this.UrlServiceV1 + "batch", this.generateAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  create(batch: any): Observable<Batch> {
    return this.http
      .post(this.UrlServiceV1 + "batch", batch, this.generateAuthHeader())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  delete(id: string): Observable<Batch> {
    return this.http
      .delete(this.UrlServiceV1 + "batch/" + id, super.generateAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

}
