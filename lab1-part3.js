const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Alice', age: 19, city: 'New York' },
    { name: 'Bob', age: 25, city: 'Chicago' },
    { name: 'Mary', age: 20, city: 'Miami' },
    { name: 'David', age: 30, city: 'Seattle' }
];

persons.groupName = 'A';
persons.teacher = 'Joan Doe';
persons.year = '2023';

for (const person of persons) {
    console.log(person.name); 
}

for (const key in persons) {
    console.log(`${key}:`, persons[key]);
}


const defaults = { mode: 'test', debugLevel: 'error', logFolder: 'root' };
const userSetting = { mode: 'production', debugLevel: 'trace' };

function mergeSettings(def, user) {
    const way1 = { ...def, ...user };
    const way2 = Object.assign({}, def, user);
    const way3 = {};
    for (let key in def) way3[key] = def[key];
    for (let key in user) way3[key] = user[key];
    return way1; 
}
console.log('\nMerged Settings:', mergeSettings(defaults, userSetting));


const firstPerson = persons[0];

Object.defineProperty(firstPerson, 'birthYear', {
    get: function() { 
        const currentYear = new Date().getFullYear(); 
        return currentYear - this.age; 
    },
    configurable: false
});
console.log('\nBirth year:', firstPerson.birthYear);


const arr1 = [1, 2];
const arr2 = [3, 4];

const concatArr = arr1.concat(arr2);      
const spreadArr = [...arr1, ...arr2];


const textFragments = persons.map(p => {
    const birthYear = new Date().getFullYear() - p.age;
    return `${p.name} from ${p.city} born in ${birthYear}`;
});
console.log('\nText Fragments:', textFragments);


const olderThan20 = persons.filter(p => p.age > 20);
console.log('\nOlder than 20:', olderThan20);


const { name, city } = persons[0];
console.log('\nDestructured Object:', name, city);

const [firstEl] = persons;
console.log('Destructured Array:', firstEl.name);


function getUserData(userName) {
    const found = persons.find(p => p.name === userName);
    if (!found) {
        throw new Error('Unable to find user');
    }
    return found;
}

function showUserInfo(userName) {
    console.log('\nLoading');
    try {
        const data = getUserData(userName);
        console.log('User found:', data);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        console.log('Loading finished');
    }
}

showUserInfo('John'); 
showUserInfo('Superman'); 


const textToArray = (text) => [...text]; 
console.log('\nText to array:', textToArray('Hello'));


const reverseWord = (word) => word.split('').reverse().join('');
console.log('Reversed word:', reverseWord('JavaScript'));


const isJsFile = (filename) => filename.endsWith('.js');
console.log('Is script.js a JS file?', isJsFile('script.js')); 


const sentenceToWords = (sentence) => sentence.split(' ');
console.log('Sentence to words:', sentenceToWords('JavaScript is very cool'));


const replaceWord = (text, oldWord, newWord) => {
    return text.replaceAll(oldWord, newWord); 
};
console.log('Replaced word:', replaceWord('I love Java. Java is great.', 'Java', 'JS'));