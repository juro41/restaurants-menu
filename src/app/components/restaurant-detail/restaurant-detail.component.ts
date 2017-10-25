import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MenuService } from '../../services/menu/menu.service';


@Component({
    selector: 'app-restaurant-detail',
    templateUrl: './restaurant-detail.component.html',
    styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

    restaurant: any;
    restaurantName: string;
    daysInWeek = ['Pondeli', 'Utery', 'Streda', 'Ctvrtek', 'Patek', 'Sobota', 'Nedele'];
    date = new Date();
    weekMenu = [];
    mondayDate: string;
    sundayDate: string;

    constructor(
        private menuService: MenuService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.date.setHours(0, 0, 0, 0);                                                         // date with actual time change on midnight
        this.route.params
            .subscribe(params => {
                this.menuService.getRestaurant(params['id']).then((res, rej) => {
                    this.restaurant = res;
                    this.restaurantName = this.restaurant.name;
                    this.getWeekMenu();
                });
            });
    }

    getPreviousWeek() {
        this.date = new Date(this.date.getTime() - 86400000 * 7);
        this.getWeekMenu();
    }

    getNextWeek() {
        this.date = new Date(this.date.getTime() + 86400000 * 7);
        this.getWeekMenu();
    }

    getWeekMenu() {
        this.date.setHours(0, 0, 0, 0);
        this.weekMenu = this.menuService.getWeekMenuByDateAndByRestaurant(this.date, this.restaurant.id);
        this.mondayDate = this.weekMenu[0].date.toLocaleDateString();
        this.sundayDate = this.weekMenu[6].date.toLocaleDateString();
    }
}
