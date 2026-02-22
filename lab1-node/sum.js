const args = process.argv.slice(2);

const sum = args.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue);
}, 0);

console.log(`Sum = ${sum}`);