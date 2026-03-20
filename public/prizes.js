let lstPrizes = [];

const readPrizes = async function() {
    const response = await fetch('/prize');
    lstPrizes = await response.json(); // extract JSON from response
    const prizesData = document.getElementById('prizesData');
    prizesData.replaceChildren(buildPrizesTable(lstPrizes));
}

function buildPrizesTable(prizes) {
    const table = document.createElement('table');
    table.className = 'table table-striped table-hover';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Name', 'Description', 'Category', 'Points Cost', 'Stock'];

    headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    prizes.forEach((prize) => {
        const row = document.createElement('tr');
        const values = [
            prize.name,
            prize.description,
            prize.category,
            `${prize.pointsCost} pts`,
            prize.stock
        ];

        values.forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table;
}

async function showPrizes() {
    document.getElementById('prizes').hidden = false;
    document.getElementById('showBtn').hidden = true;
    document.getElementById('hideBtn').hidden = false;
    await readPrizes();
}

function hidePrizes() {
    document.getElementById('prizes').hidden = true;
    document.getElementById('showBtn').hidden = false;
    document.getElementById('hideBtn').hidden = true;
    document.getElementById('prizesData').replaceChildren();
}
