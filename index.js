        // Продвинутый JavaScript (семинары)
        // Урок 1. Коллекции и итераторы. Модули


const music = {
    albums: [
        {title: "The Dark Side of the Moon", artist: "Pink Floyd", year: 1973},
        {title: "The Wall", artist: "Pink Floyd", year: 1979},
        {title: "Wish You Were Here", artist: "Pink Floyd", year: 1975},
        {title: "Animals", artist: "Pink Floyd", year: 1977},
        {title: "The Piper at the Gates of Dawn", artist: "Pink Floyd", year: 1967},
        {title: "A Saucerful of Secrets", artist: "Pink Floyd", year: 1968},
        {title: "More", artist: "Pink Floyd", year: 1969},
        {title: "Ummagumma", artist: "Pink Floyd", year: 1969},
        {title: "Atom Heart Mother", artist: "Pink Floyd", year: 1970},
        
    ],
    [Symbol.iterator]: function() {
        let index = 0;
        return {
            next: () => {
                if (index < this.albums.length) {
                    return {value: this.albums[index++], done: false};
                } else {
                    return {done: true};
                }
            }   
        }
    }
}

for (const album of music) {
    console.log(album); 
}



// task 2

const dishMap = new Map([
    ['Pizza Margarita', 'Victor'],
    ['Pizza Pepperoni', 'Victor'],
    ['Sushi Philadelphia', 'Olga'],
    ['Sushi California', 'Olga'],
    ['Tiramisu', 'Dmitry'],
    ['Cheesecake', 'Dmitry']
]);

const ordersMap = new Map();

function addOrder(client, dishes) {
    ordersMap.set(client, dishes);
}

const clientAlexey = {name: 'Alexey'};
const clientMaria = {name: 'Maria'};
const clientIrina = {name: 'Irina'};

addDish(clientAlexey, 'Pizza Pepperoni', 'Tiramisu');
addDish(clientMaria, 'Sushi California', 'Pizza Margarita');
addDish(clientIrina, 'Cheesecake');

function displayOrders() {
    for (const [client, dishes] of ordersMap) {
        console.log(`${client.name} ordered ${dishes}`);
    }
    for (const dish of dishes) {
        const chef = dishMap.get(dish);
        console.log(`${dish} is cooked by ${chef}`);
    }
    console.log('');
}

displayOrders();

