import { Injectable } from '@angular/core';

import * as $ from 'jquery';
import { Menu } from '../../menu';

export const dayInMillisecons = 86400000;

@Injectable()
export class MenuService {

  JSONdata = [];

  constructor() { }

  /**
   * Returns jqXHR object containing response with data from JSON file
   * 
   * @private
   * @returns jqXHR object
   * @memberof MenuService
   */
  private getJSONData() {
    return $.getJSON('../assets/data.json', (json) => {
      return json;
    });
  }

  /**
   * Takes dayly menus from from JSON file and save them to localstorage
   * if they miss in localStorage
   * 
   * @memberof MenuService
   */
  init() {
    this.getJSONData().then((res, rej) => {
      this.JSONdata = res.days;
      this.JSONdata.forEach(day => {
        if (localStorage.getItem(day.date) == null) {
          localStorage.setItem(day.date, JSON.stringify(day));
        }
      });
    });
  }
  
  /**
   * Returns jqXHR object containing response with restaurants from JSON file
   *
   * @returns Zoznam restauraci
   * @memberof MenuService
   */
  getRestaurants() {
    return this.getJSONData().then((res, rej) => {
      return res.restaurants;
    });
  }

  /**
   * Loads data from JSON file and returns jqXHR object with JSON object
   * of restaurant with restauantID in parameter.
   * 
   * @param {string} restaurantId 
   * @returns Restaurant
   * @memberof MenuService
   */
  getRestaurant(restaurantId: string) {
    return this.getJSONData().then((res, rej) => {
      const restaurantList = res.restaurants;
      return restaurantList.filter((restaurant) => {
        return restaurant.id == restaurantId;
      })[0];
    });
  }



  /**
   * Returns menu from localStorage by date.
   * 
   * @param {number} date 
   * @returns Menu
   * @memberof MenuService
   */
  getDayMenuByDate(date: number) {
    console.log(date);
    console.log(new Date(date).toLocaleTimeString());
    let menu = localStorage.getItem(date.toString());
    if (menu != undefined) {
      return JSON.parse(menu);
    }
    return undefined;
  }

  /**
   * Loads dayMenu from localStorage by date in first parameter and return
   * list of meals for restaurant with restaurantId in second parameter
   * 
   * @param {number} date 
   * @param {string} restaurantId 
   * @returns {string[]} List of meals
   * @memberof MenuService
   */
  getMealsByDateAndReastaurant(date: number, restaurantId: string): string[] {
    let dayMenu = this.getDayMenuByDate(date);
    let meals = [];
    if (dayMenu != undefined) {
      dayMenu.menus.filter((menu) => {
        if (menu.restaurantId == restaurantId) {
          meals = menu.meals;
        }
      });
    }
    return meals;
  }

  /**
   * After finding first day of week, loads all daily menus of restataurant
   * with restaruarntId for week which are not missing in local storage and
   * put them in to list and returns as weekly menu
   * 
   * @param {Date} date 
   * @param {string} restaurantId
   * @returns Weekly menu
   * @memberof MenuService
   */
  getWeekMenuByDateAndByRestaurant(date: Date, restaurantId: string) {
    let weekMenu = [];
    let day = date.getDay();
    day = day == 0 ? 7 : day;                                                                   // Make sunday as last day
    let mondayDate = date.getTime() - dayInMillisecons * (day - 1);
    weekMenu = [];

    for (let i = mondayDate; i <= (mondayDate + dayInMillisecons * 6); i += dayInMillisecons) {
      console.log(new Date(i).toLocaleDateString());
      console.log(new Date(i).getTime());
      weekMenu.push({ date: new Date(i), meals: this.getMealsByDateAndReastaurant(i, restaurantId) });
    }
    console.log(weekMenu);
    console.log(date);
    return weekMenu;
  }

  /**
   * Updates menu in item in localStorage with key in parameter
   * date. If value with key date doesnt exist, inserts new item.
   * 
   * @param {number} date 
   * @param {Menu} newMenu 
   * @memberof MenuService
   */
  updateMenu(date: number, newMenu: Menu) {
    let updated = false;
    let dayMenu = this.getDayMenuByDate(date);

    if (dayMenu != undefined) {                                                                 // If dayMenu exist in localStorage
      dayMenu.menus.filter((menu) => {
        if (menu.restaurantId == newMenu.restaurantId) {
          menu.meals = newMenu.meals;                                                           // Update list of meals if already exist
          updated = true;
        }
      });

      if (!updated) {
        dayMenu.menus.push({                                                                    // Insert new restaurant
           restaurantId: newMenu.restaurantId,
           restaurantName: newMenu.restaurantName,
           meals: newMenu.meals });
        updated = true;
      }

    } else {
      dayMenu = {                                                                               // Creates whole dayMenu
        date: date, menus: [{
          restaurantId: newMenu.restaurantId,
          restaurantName: newMenu.restaurantName,
          meals: newMenu.meals }]
      };
    }
    localStorage.setItem(date.toString(), JSON.stringify(dayMenu));                            // Save to localStorage
  }

  /**
   * Removes menu in item with key date for restaurant with restaurantId in parameter
   * deletingMenu. After removing if item is empty, removes item
   * from localStorage.
   * 
   * @param {number} date 
   * @param {Menu} deletingMenu 
   * @memberof MenuService
   */
  deleteMenu(date: number, deletingMenu: Menu) {
    let dayMenu = this.getDayMenuByDate(date);

    if (dayMenu != undefined) {
      dayMenu.menus.filter((menu, i) => {
        if (menu.restaurantId == deletingMenu.restaurantId) {
          dayMenu.menus.splice(i, 1);
        }
      });
    }

    if (dayMenu.menus.length != 0) {
      localStorage.setItem(date.toString(), JSON.stringify(dayMenu));
    } else {
      localStorage.removeItem(date.toString());
    }

  }

}
