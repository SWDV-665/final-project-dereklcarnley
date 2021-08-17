import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Register', url: '/registration', icon: 'person' },
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Dashboard', url: '/dashboard', icon: 'home' }
  ];
  
  constructor() {}
}
