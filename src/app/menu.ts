export class Menu {

    constructor(
        public restaurantId: string,
        public restaurantName: string,
        public meals = []
    ) { }
}
