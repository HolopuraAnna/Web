// Функція, яка з певною імовірністю (50%) кидає помилку
async function task1() {
    await delay(500); // затримка для наочності
    if (Math.random() < 0.5) {
        throw new Error("Помилка у task1");
    }
    return "task1 виконано успішно";
}

async function task2() {
    await delay(800);
    if (Math.random() < 0.5) {
        throw new Error("Помилка у task2");
    }
    return "task2 виконано успішно";
}

// Допоміжна функція delay (з попереднього завдання)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Виклик двох асинхронних функцій паралельно через Promise.any()
(async () => {
    try {
        const result = await Promise.any([task1(), task2()]);
        console.log("✅ Програма виконана успішно:", result);
    } catch (error) {
        // Promise.any кидає AggregateError, якщо всі проміси відхилені
        console.log("❌ Всі задачі завершились з помилкою:", error.errors);
    }
})();
