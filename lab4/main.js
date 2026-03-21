let currentLoadedUsers = [];
let sortAscending = true; 

function init() {
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

    const menuItems = ['User Rating', 'News', 'Contacts', 'About'];
    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.textContent = item;
        btn.style.marginRight = '10px';
        btn.onclick = () => {
            let title = content.querySelector('h2.content-title');
            if (!title) {
                title = document.createElement('h2');
                title.className = 'content-title';
                content.prepend(title);
            }
            title.textContent = item;
        };
        header.append(btn);
    });

    const currentUsersBlock = document.createElement('div');
    currentUsersBlock.innerHTML = `Активних користувачів: <span id="activeCount">0</span>`;
    
    const newUsersBlock = document.createElement('div');
    const newUsersData = getNewUsers();
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
        getUsersBtn.onclick = handleGetUsers;

        const tableWrapper = document.createElement('div');
        tableWrapper.id = 'tableWrapper';

        content.append(noUsersMsg, getUsersBtn, tableWrapper);

        leftPanel.querySelector('.loader').remove();
        
        const searchInput = document.createElement('input');
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

async function handleGetUsers() {
    document.getElementById('noUsersMsg').style.display = 'none';
    const btn = document.getElementById('getUsersBtn');
    btn.disabled = true;

    currentLoadedUsers = await fetchUsers();

    document.getElementById('activeCount').textContent = currentLoadedUsers.length;
    renderTable();
    updateScoreSum();
    
    btn.disabled = false;
}

function renderTable() {
    const wrapper = document.getElementById('tableWrapper');
    wrapper.innerHTML = '';

    const table = document.createElement('table');
    table.id = 'usersTable';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    ['Ім\'я', 'Прізвище', 'Бали'].forEach((text, index) => {
        const th = document.createElement('th');
        th.textContent = text;
        if (index === 0) {
            th.onclick = sortTableByName;
            th.title = 'Натисніть для сортування';
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
    document.getElementById('scoreSum').textContent = `Сума балів: ${total}`;
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
            delBtn.style.color = 'white';
            delBtn.style.backgroundColor = '#dc3545';
            delBtn.style.border = 'none';
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

function sortTableByName() {
    sortAscending = !sortAscending;
    currentLoadedUsers.sort((a, b) => {
        if (a.firstname < b.firstname) return sortAscending ? -1 : 1;
        if (a.firstname > b.firstname) return sortAscending ? 1 : -1;
        return 0;
    });
    renderTable();
}

document.addEventListener('DOMContentLoaded', init);