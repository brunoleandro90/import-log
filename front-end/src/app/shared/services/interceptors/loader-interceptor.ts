import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }
  // constructor(private loadingService: LoaderService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   this.loadingService.show();

  //   return next
  //     .handle(req)
  //     .pipe(
  //       tap((event: HttpEvent<any>) => {
  //         if (event instanceof HttpResponse) {
  //           this.loadingService.hide();
  //         }
  //       }, (error) => {
  //         this.loadingService.hide();
  //       })
  //     );
  // }
}