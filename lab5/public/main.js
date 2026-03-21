let currentLoadedUsers = [];
let sortOrder = 'asc';

async function init() {
    const mainDiv = document.getElementById('main');
    const header = document.createElement('header');
    const mainSection = document.createElement('main');
    const footer = document.createElement('footer');
    
    mainDiv.append(header, mainSection, footer);

    const leftPanel = document.createElement('div');
    leftPanel.id = 'leftPanel';
    const content = document.createElement('div');
    content.id = 'content';
    const rightPanel = document.createElement('div');
    rightPanel.id = 'rightPanel';

    mainSection.append(leftPanel, content, rightPanel);

    const createLoader = () => {
        const div = document.createElement('div');
        div.className = 'loader';
        return div;
    };

    leftPanel.append(createLoader());
    content.append(createLoader());
    rightPanel.append(createLoader());

    const menuItems = ['User Rating', 'News', 'Contacts', 'About', 'Gallery'];
    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.textContent = item;
        btn.onclick = () => handleMenuClick(item, content);
        header.append(btn);
    });

    const currentUsersBlock = document.createElement('div');
    currentUsersBlock.innerHTML = `Активних користувачів: <span id="activeCount">0</span>`;
    
    const newUsersBlock = document.createElement('div');
    const newUsersData = await getNewUsers();
    newUsersBlock.innerHTML = `Нові: ${newUsersData.map(u => u.lastname).join(', ')}`;
    
    footer.append(currentUsersBlock, newUsersBlock);

    setTimeout(() => {
        content.querySelector('.loader').remove();
        
        const noUsersMsg = document.createElement('h3');
        noUsersMsg.textContent = 'No users';
        noUsersMsg.id = 'noUsersMsg';

        const getUsersBtn = document.createElement('button');
        getUsersBtn.textContent = 'Get Users';
        getUsersBtn.id = 'getUsersBtn';
        getUsersBtn.onclick = () => handleGetUsers();

        const contentWrapper = document.createElement('div');
        contentWrapper.id = 'contentWrapper';

        content.append(noUsersMsg, getUsersBtn, contentWrapper);

        leftPanel.querySelector('.loader').remove();
        
        const weatherWidget = document.createElement('div');
        weatherWidget.id = 'weatherWidget';
        weatherWidget.className = 'weather-widget';
        leftPanel.append(weatherWidget);
        updateWeatherUI();
        setInterval(updateWeatherUI, 60000);
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'searchInput';
        searchInput.placeholder = 'Пошук...';
        
        const searchBtn = document.createElement('button');
        searchBtn.textContent = 'Шукати';
        searchBtn.onclick = handleSearch;
        
        leftPanel.append(searchInput, searchBtn);

        rightPanel.querySelector('.loader').remove();
        
        const scoreSumP = document.createElement('p');
        scoreSumP.id = 'scoreSum';
        scoreSumP.textContent = 'Сума балів: 0';

        const editLabel = document.createElement('label');
        const editCheckbox = document.createElement('input');
        editCheckbox.type = 'checkbox';
        editCheckbox.id = 'editCheckbox';
        editCheckbox.onchange = toggleEditMode;
        
        editLabel.append(editCheckbox, ' Edit table');
        editLabel.style.display = 'block';
        editLabel.style.marginTop = '10px';

        rightPanel.append(scoreSumP, editLabel);

    }, 1000);
}

async function handleMenuClick(item, contentDiv) {
    let wrapper = document.getElementById('contentWrapper');
    if (!wrapper) return;
    wrapper.innerHTML = ''; 

    const title = document.createElement('h2');
    title.textContent = item;
    wrapper.append(title);

    if (item === 'Gallery') {
        const images = await fetchGalleryImages();
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        
        if (images.length === 0) {
            grid.innerHTML = '<p>Немає зображень у папці public/gallery</p>';
        } else {
            images.forEach(imgName => {
                const img = document.createElement('img');
                img.src = `/gallery/${imgName}`;
                grid.append(img);
            });
        }
        wrapper.append(grid);
    }
}

async function updateWeatherUI() {
    const data = await fetchWeather();
    const widget = document.getElementById('weatherWidget');
    if (widget) {
        widget.textContent = `${data.city}: ${data.temperature}°C`;
    }
}

async function handleGetUsers(sortBy = '', order = '') {
    const noUsersMsg = document.getElementById('noUsersMsg');
    if (noUsersMsg) noUsersMsg.style.display = 'none';
    
    const btn = document.getElementById('getUsersBtn');
    if (btn) btn.disabled = true;

    currentLoadedUsers = await fetchUsers(sortBy, order);

    const countEl = document.getElementById('activeCount');
    if (countEl) countEl.textContent = currentLoadedUsers.length;
    
    renderTable();
    updateScoreSum();
    
    if (btn) btn.disabled = false;
}

function renderTable() {
    const wrapper = document.getElementById('contentWrapper');
    wrapper.innerHTML = '';

    const table = document.createElement('table');
    table.id = 'usersTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = [
        { text: 'Ім\'я', key: 'firstname' },
        { text: 'Прізвище', key: 'lastname' },
        { text: 'Бали', key: null }
    ];

    headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h.text;
        if (h.key) {
            th.onclick = () => sortTableServerSide(h.key);
        }
        headerRow.append(th);
    });
    
    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement('tbody');
    currentLoadedUsers.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.score}</td>
        `;
        tbody.append(tr);
    });
    table.append(tbody);
    wrapper.append(table);

    toggleEditMode();
}

function sortTableServerSide(columnKey) {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    handleGetUsers(columnKey, sortOrder);
}

function handleSearch() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTable tbody tr');

    rows.forEach(row => {
        row.classList.remove('highlight');
        if (searchText && row.textContent.toLowerCase().includes(searchText)) {
            row.classList.add('highlight');
        }
    });
}

function updateScoreSum() {
    const total = currentLoadedUsers.reduce((sum, user) => sum + user.score, 0);
    const scoreP = document.getElementById('scoreSum');
    if (scoreP) scoreP.textContent = `Сума балів: ${total}`;
}

function toggleEditMode() {
    const isEditing = document.getElementById('editCheckbox')?.checked;
    const table = document.getElementById('usersTable');
    if (!table) return;

    const headRow = table.querySelector('thead tr');
    const bodyRows = table.querySelectorAll('tbody tr');

    let actionTh = headRow.querySelector('.action-col');
    if (isEditing && !actionTh) {
        actionTh = document.createElement('th');
        actionTh.className = 'action-col';
        actionTh.textContent = 'Дія';
        headRow.append(actionTh);
    } else if (!isEditing && actionTh) {
        actionTh.remove();
    }

    bodyRows.forEach((row, index) => {
        let actionTd = row.querySelector('.action-col');
        if (isEditing && !actionTd) {
            actionTd = document.createElement('td');
            actionTd.className = 'action-col';
            
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.style.backgroundColor = '#8b3a2b'; 
            delBtn.onclick = () => {
                currentLoadedUsers.splice(index, 1);
                renderTable();
                updateScoreSum();
                document.getElementById('activeCount').textContent = currentLoadedUsers.length;
            };
            
            actionTd.append(delBtn);
            row.append(actionTd);
        } else if (!isEditing && actionTd) {
            actionTd.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);