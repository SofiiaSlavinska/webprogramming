const usersDatabase = Array.from({ length: 20 }, (_, i) => ({
    firstname: `Ім'я_${i + 1}`,
    lastname: `Прізвище_${i + 1}`,
    score: Math.floor(Math.random() * 100) + 1
}));

function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            const shuffled = [...usersDatabase].sort(() => 0.5 - Math.random());
            resolve(shuffled.slice(0, 10));
        }, 1000);
    });
}

function getNewUsers() {
    return usersDatabase.slice(0, 5);
}