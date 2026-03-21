async function fetchUsers(sortBy = '', order = '') {
    let url = '/api/users';
    if (sortBy && order) {
        url += `?sortBy=${sortBy}&order=${order}`;
    }
    const response = await fetch(url);
    return await response.json();
}

async function getNewUsers() {
    const response = await fetch('/api/new-users');
    return await response.json();
}

async function fetchWeather() {
    const response = await fetch('/api/weather');
    return await response.json();
}

async function fetchGalleryImages() {
    const response = await fetch('/api/gallery');
    return await response.json();
}