const args = process.argv.slice(2);
const operation = args[0];
const num1 = Number(args[1]);
const num2 = Number(args[2]);

let result;

switch (operation) {
    case 'add':
        result = num1 + num2;
        break;
    case 'sub':
        result = num1 - num2;
        break;
    case 'mul':
        result = num1 * num2;
        break;
    case 'div':
        result = num1 / num2;
        break;
    default:
        result = 'Unknown operation';
}

console.log(`Result = ${result}`);