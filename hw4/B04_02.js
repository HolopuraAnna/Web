// Базовий конструктор
function Shape() {}

// Метод за замовчуванням
Shape.prototype.area = function() {
    return 0; // загальна фігура — невідомо, тому 0
};


// Конструктор еліпса
function Ellipse(a, b) {
    this.a = a; // піввісь 1
    this.b = b; // піввісь 2
}

// Наслідування прототипу Shape
Ellipse.prototype = Object.create(Shape.prototype);
Ellipse.prototype.constructor = Ellipse;

// Перевизначений метод area для еліпса
Ellipse.prototype.area = function() {
    return Math.PI * this.a * this.b;
};


// Конструктор кола
function Circle(r) {
    Ellipse.call(this, r, r); // коло — це еліпс з a=b=r
    this.r = r;
}

// Наслідування від Ellipse
Circle.prototype = Object.create(Ellipse.prototype);
Circle.prototype.constructor = Circle;

// Перевизначений метод area для кола
Circle.prototype.area = function() {
    return Math.PI * this.r * this.r;
};


// --- Демонстрація роботи ---
let shape = new Shape();
let ellipse = new Ellipse(3, 5);
let circle = new Circle(4);

console.log("Shape area:", shape.area());      // 0
console.log("Ellipse area:", ellipse.area());  // 47.12...
console.log("Circle area:", circle.area());    // 50.26...
