import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  show() {
    this.isLoading.next(true);
  }
  
  hide() {
    this.isLoading.next(false);
  }
}
