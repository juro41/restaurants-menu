import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DateAdapter, NativeDateAdapter } from '@angular/material';

import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-home-menu-item',
  templateUrl: './home-menu-item.component.html',
  styleUrls: ['./home-menu-item.component.css']
})
export class HomeMenuItemComponent implements OnInit {

  menus = [];
  date = new Date();
  day: number;
  daysInWeek = ['Nedele', 'Pondeli', 'Utery', 'Streda', 'Ctvrtek', 'Patek', 'Sobota'];

  constructor(dateAdapter: DateAdapter<NativeDateAdapter>, private menuService: MenuService) {
    dateAdapter.setLocale('cz-CZ');
  }

  ngOnInit() {
    this.date.setHours(0, 0, 0, 0);
    this.onDateChange();
  }

  onDateChange() {
    this.day = this.date.getDay();
    let dayMenu = this.menuService.getDayMenuByDate(this.date.getTime());
    this.menus = dayMenu != undefined ? dayMenu.menus : [];
  }

  get dayName() {
    return this.daysInWeek[this.date.getDay()];
  }

  get localDateString() {
    return this.date.toLocaleDateString();
  }
}
