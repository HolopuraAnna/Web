// === Базовий конструктор Candy ===
function Candy(volume) {
    this.volume = volume; // об'єм цукерки
}

// Метод для відображення об'єкта
Candy.prototype.toString = function() {
    return `об’єму ${this.volume}`;
};

// Метод для отримання кількості цукру (буде перевизначений)
Candy.prototype.getSugar = function() {
    return 0.0;
};


// === Підкласи (ієрархія цукерок) ===

// 1. Шоколадна цукерка
function ChocolateCandy(volume) {
    Candy.call(this, volume);
}

ChocolateCandy.prototype = Object.create(Candy.prototype);
ChocolateCandy.prototype.constructor = ChocolateCandy;

ChocolateCandy.prototype.toString = function() {
    return "Шоколадна цукерка " + Candy.prototype.toString.call(this);
};

// Кількість цукру залежить від типу і об’єму
ChocolateCandy.prototype.getSugar = function() {
    return 10 + 0.8 * this.volume;
};


// 2. Карамельна цукерка
function CaramelCandy(volume) {
    Candy.call(this, volume);
}

CaramelCandy.prototype = Object.create(Candy.prototype);
CaramelCandy.prototype.constructor = CaramelCandy;

CaramelCandy.prototype.toString = function() {
    return "Карамельна цукерка " + Candy.prototype.toString.call(this);
};

CaramelCandy.prototype.getSugar = function() {
    return 6 + 1.2 * this.volume;
};


// 3. Мармеладна цукерка
function JellyCandy(volume) {
    Candy.call(this, volume);
}

JellyCandy.prototype = Object.create(Candy.prototype);
JellyCandy.prototype.constructor = JellyCandy;

JellyCandy.prototype.toString = function() {
    return "Мармеладна цукерка " + Candy.prototype.toString.call(this);
};

JellyCandy.prototype.getSugar = function() {
    return 4 + 0.9 * this.volume;
};


// === Конструктор для дитячого подарунку ===
function Present(candies) {
    this.candies = candies;
}

// Виведення списку цукерок
Present.prototype.toString = function() {
    return "Подарунок містить: " + this.candies.join(", ");
};

// Загальна "вага" — сума об’ємів
Present.prototype.getWeight = function() {
    let weight = 0.0;
    for (const candy of this.candies) {
        weight += candy.volume;
    }
    return weight;
};

// Пошук цукерок за діапазоном цукру
Present.prototype.findBySugarRange = function(minSugar, maxSugar) {
    return this.candies.filter(c => {
        let s = c.getSugar();
        return s >= minSugar && s <= maxSugar;
    });
};


// === Демонстрація роботи ===
let candies = [
    new ChocolateCandy(12),
    new CaramelCandy(8),
    new JellyCandy(10),
    new ChocolateCandy(6),
    new JellyCandy(5)
];

let present = new Present(candies);

console.log(present.toString());
console.log("Загальна вага подарунку:", present.getWeight().toFixed(2), "од.");
console.log("Цукерки з вмістом цукру від 12 до 15:");
console.log(present.findBySugarRange(12, 15).join(", "));
