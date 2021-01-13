import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageUtils } from 'src/app/shared/utils/localstorage';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  public pushRightClass: string = 'push-right';
  localStorageUtils = new LocalStorageUtils();

  constructor(public router: Router) {
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
    this.localStorageUtils.logOff();
    this.router.navigate(['/login']);
  }
}
