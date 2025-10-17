// Додаємо метод size() до прототипу Object
Object.prototype.size = function() {
    let count = 0;
    for (let key in this) {
        // перевіряємо, чи є ключ власним (не з прототипу)
        // і чи значення не є функцією
        if (this.hasOwnProperty(key) && typeof this[key] !== "function") {
            count++;
        }
    }
    return count;
};

// Перевірка роботи
let obj1 = {a: 1, b: 2, c: 3};
let obj2 = {name: "Alice", age: 25, greet: function() { console.log("Hi"); }};
let obj3 = Object.create(obj1);
obj3.newProp = 42;

console.log(obj1.size()); // 3
console.log(obj2.size()); // 2 (бо greet — функція, не враховується)
console.log(obj3.size()); // 1 (бо newProp — власне поле)
