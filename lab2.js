const average = (...args) => {
    if (args.length === 0) return 0;
    const sum = args.reduce((acc, val) => acc + val, 0);
    return sum / args.length;
};
console.log("AVG (10, 20, 30, 40):", average(10, 20, 30, 40));

function values(f, low, high) {
    const result = [];
    for (let i = low; i <= high; i++) {
        result.push(f(i)); 
    }
    return result;
}
console.log("\nf(x) = x * 2, from 1 to 5:", values(x => x * 2, 1, 5));

function callWithContext(obj, callback) {
    callback.call(obj);
}
const personObj = { name: 'John Wick', age: 40 };

callWithContext(personObj, function() {
    const date = new Date().toLocaleDateString();
    console.log(`\nToday is ${date}! Happy birthday ${this.name}.`);
});


function createCounter() {
    let count = 0;
    return {
        increment: () => { count++; },
        getValue: () => count
    };
}
const counter = createCounter();
counter.increment();
counter.increment();
console.log("\nCurrent value:", counter.getValue());

function getGreeting() {
    let lastArg = null;
    let lastResult = null;
    
    return function(name) {
        if (name === lastArg) {
            return `${lastResult} (returned cache)`;
        }
        lastArg = name;
        lastResult = `Hello ${name}`;
        return lastResult;
    };
}
const greet = getGreeting();
console.log("\n" + greet("Rick")); 
console.log(greet("Rick")); 
console.log(greet("Mark"));

function makeAdder(number1) {
    return function(number2) {
        return number1 + number2;
    };
}
const add10 = makeAdder(10);
console.log("\n10 + 5 =", add10(5));
console.log("10 + 20 =", add10(20));

function createTextChecker(textArray) {
    return function(searchString) {
        return textArray.includes(searchString);
    };
}
const checkFruits = createTextChecker(['apple', 'banana', 'orange']);
console.log("\nIs banana here?", checkFruits('banana'));
console.log("Is grape here?", checkFruits('grape')); 

const usersList = [
    { name: 'john', role: 'admin' },
    { name: 'alice', role: 'user' }
];
const capitalizeNames = (arr) => arr.map(obj => ({
    ...obj, 
    name: obj.name.charAt(0).toUpperCase() + obj.name.slice(1) 
}));
console.log("\nCapitalizing:", capitalizeNames(usersList));

function introduce(greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.firstName}${punctuation}`);
}
const userForIntro = { firstName: 'Mariia' };
introduce.call(userForIntro, '\nHi (call)', '!');
introduce.apply(userForIntro, ['Hello (apply)', '.']);
const boundIntro = introduce.bind(userForIntro, 'Hey (bind)');
boundIntro('~');

function executeWithLog(callback, ...args) {
    const executionTime = new Date().toLocaleTimeString();
    console.log(`\nFunction: ${callback.name || 'anonymous'}, Arguments: [${args}], Time: ${executionTime}`);
    return callback(...args);
}

function multiply(a, b) { return a * b; }
console.log("Multiply result:", executeWithLog(multiply, 4, 5));

function cacheFor10Seconds(fn) {
    let cachedResult = null;
    let lastCallTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        if (currentTime - lastCallTime < 10000 && lastCallTime !== 0) {
            console.log("(cache, less than 10 sec)");
            return cachedResult;
        }
        lastCallTime = currentTime;
        cachedResult = fn(...args);
        return cachedResult;
    };
}
const fastMath = cacheFor10Seconds((a, b) => a + b);
console.log("\nCall 1:", fastMath(5, 5));
console.log("Call 2:", fastMath(5, 5));