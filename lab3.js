function invokeAfterDelay(delay, callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, delay);
    });
}

function produceRandomAfterDelay() {
    return invokeAfterDelay(1000, () => Math.floor(Math.random() * 11));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mockDatabase = [
    { id: 0, name: 'Mariia', age: 20, city: 'Kyiv' },
    { id: 1, name: 'Taras', age: 15, city: 'Lviv' },
    { id: 2, name: 'Petro', age: 30, city: 'Odesa' },
    { id: 3, name: 'Yuliia', age: 68, city: 'Kharkiv' }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockDatabase.find(u => u.id === id);
            if (user) {
                resolve(user);
            } else {
                reject(new Error(`User is not found (id: ${id})`));
            }
        }, 1000);
    });
}

function loadUsers(ids) {
    const userPromises = ids.map(id => getUser(id));
    return Promise.all(userPromises).catch(error => {
        console.error("5. Error caught:", error.message);
        throw error; 
    });
}

function logCall(callback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            callback();
            console.log(`6. Current time is ${new Date().toLocaleTimeString()}`);
            resolve();
        }, 1000);
    });
}

async function showUsers(ids) {
    console.log('loading'); 
    try {
        const users = await loadUsers(ids);
        console.log('7. Successfully loaded users:', users);
    } catch (error) {
        console.log('7. Failed to load some users due to an error.');
    } finally {
        console.log('loading finished');
    }
}

async function runAllTasks() {
    const t1Result = await invokeAfterDelay(1000, () => Math.floor(Math.random() * 11));
    console.log(`1. Random number is ${t1Result}`);

    const [num1, num2] = await Promise.all([produceRandomAfterDelay(), produceRandomAfterDelay()]);
    console.log(`2. Result: Generated ${num1} and ${num2}. Their sum is ${num1 + num2}`);

    console.log("3. Sleeping for 1 second");
    await sleep(1000);
    console.log("3. Woke up after 1 second");

    await logCall(() => console.log("Executing Call 1"))
        .then(() => logCall(() => console.log("Executing Call 2")))
        .then(() => logCall(() => console.log("Executing Call 3")))
        .then(() => logCall(() => console.log("Executing Call 4")));

    console.log("\nTask 7");
    console.log("Test A: Valid IDs [0, 1]");
    await showUsers([0, 1]);

    console.log("\nTest B: Invalid ID included [2, 5]");
    await showUsers([2, 5]);
}

runAllTasks();