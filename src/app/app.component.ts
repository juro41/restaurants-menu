import { Component, OnInit } from '@angular/core';

import { MenuService } from './services/menu/menu.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, MenuService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.init();
  }
}
