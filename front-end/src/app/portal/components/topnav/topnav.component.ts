import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  public pushRightClass: string = 'push-right';

  constructor(public router: Router,
    private localStorageService: LocalStorageService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  isToggled(): boolean {
    let dom = document.querySelector('body');
    return dom != null ? dom.classList.contains(this.pushRightClass) : false;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    this.localStorageService.logOff();
    this.router.navigate(['/login']);
  }
}
