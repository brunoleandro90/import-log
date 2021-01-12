import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(protected http: HttpClient,
    protected localStorageService: LocalStorageService,
    protected resourceUrl: String) { }

  public getAll = (): Observable<T[]> => {
    return this.http.get<T[]>(`${environment.urlAddress}/${this.resourceUrl}`, this.generateAuthHeaderJson());
  }

  public getById = (id: string): Observable<T> => {
    return this.http.get<T>(`${environment.urlAddress}/${this.resourceUrl}/${id}`, this.generateAuthHeaderJson());
  }

  public create = (obj: T): Observable<T> => {
    return this.http.post<T>(`${environment.urlAddress}/${this.resourceUrl}`, obj, this.generateAuthHeaderJson());
  }

  public update = (id: string, obj: T): Observable<T> => {
    debugger;
    return this.http.put<T>(`${environment.urlAddress}/${this.resourceUrl}/${id}`, obj, this.generateAuthHeaderJson());
  }

  public delete = (id: string) => {
    return this.http.delete(`${environment.urlAddress}/${this.resourceUrl}/${id}`, this.generateAuthHeaderJson());
  }

  protected generateAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      })
    };
  }

  protected generateAuthHeaderFormData() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      })
    };
  }
}
