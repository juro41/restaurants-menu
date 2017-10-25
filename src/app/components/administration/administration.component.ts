import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

import { Menu } from '../../menu';
import { MenuService } from '../../services/menu/menu.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.css']
})

export class AdministrationComponent implements OnInit {

    date = new Date();
    restaurants = [];
    menu = new Menu('', '', []);

    constructor(
        dateAdapter: DateAdapter<NativeDateAdapter>,
        private menuService: MenuService,
        private authService: AuthService,
        private router: Router
    ) {
        dateAdapter.setLocale('cz-CZ');
    }

    ngOnInit() {
        this.date.setHours(0, 0, 0, 0);
        this.menuService.getRestaurants().then((res, rej) => {
            this.restaurants = res;
        });
    }

    save() {
        if (this.menu.meals.length == 0) {                                                      // if no meals delete menu
            this.menuService.deleteMenu(this.date.getTime(), this.menu);
        } else {
            this.menuService.updateMenu(this.date.getTime(), this.menu);
        }
    }

    onDateChange() {
        this.menu.meals = [];
        if (this.menu.restaurantId != undefined) {
            this.menu.meals = this.menuService.getMealsByDateAndReastaurant(this.date.getTime(), this.menu.restaurantId);
        }
    }

    onRestaurantChange() {
        this.menu.meals = [];
        if (this.menu.restaurantId != undefined) {
            this.menu.restaurantName = this.restaurants.filter((restaurant) => {
                return restaurant.id == this.menu.restaurantId;
            })[0].name;
        }
        this.menu.meals = this.menuService.getMealsByDateAndReastaurant(this.date.getTime(), this.menu.restaurantId);
    }

    addMeal() {
        this.menu.meals.push({ name: '', price: '' });
    }

    removeMeal(i) {
        this.menu.meals.splice(i, 1);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    get localDateString() {
        return this.date.toLocaleDateString();
    }
}
