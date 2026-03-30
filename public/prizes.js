let lstPrizes = [];

const readPrizes = async function() {
    const response = await fetch('/prize');
    lstPrizes = await response.json(); // extract JSON from response
    const prizesData = document.getElementById('prizesData');
    prizesData.replaceChildren(buildPrizesTable(lstPrizes));
    populatePrizeDropdowns(lstPrizes);
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

function populatePrizeDropdowns(prizes) {
    const updateSelect = document.getElementById('updatePrizeId');
    const deleteSelect = document.getElementById('deletePrizeId');

    updateSelect.replaceChildren();
    deleteSelect.replaceChildren();

    prizes.forEach((prize) => {
        const updateOption = document.createElement('option');
        updateOption.value = prize._id;
        updateOption.textContent = `${prize.name} (${prize.pointsCost} pts)`;
        updateSelect.appendChild(updateOption);

        const deleteOption = document.createElement('option');
        deleteOption.value = prize._id;
        deleteOption.textContent = prize.name;
        deleteSelect.appendChild(deleteOption);
    });

    if (prizes.length > 0) {
        loadPrizeIntoUpdateForm(prizes[0]._id);
    } else {
        loadPrizeIntoUpdateForm('');
    }
}

function loadPrizeIntoUpdateForm(prizeId) {
    const selectedPrize = lstPrizes.find((prize) => String(prize._id) === String(prizeId));

    if (!selectedPrize) {
        document.getElementById('updateName').value = '';
        document.getElementById('updateCategory').value = '';
        document.getElementById('updatePoints').value = '';
        return;
    }

    document.getElementById('updateName').value = selectedPrize.name;
    document.getElementById('updateCategory').value = selectedPrize.category;
    document.getElementById('updatePoints').value = selectedPrize.pointsCost;
}

function showMessage(text, isError) {
    const message = document.getElementById('prizeMessage');
    message.hidden = false;
    message.textContent = text;
    message.className = `alert prize-alert ${isError ? 'alert-danger' : 'alert-success'}`;
}

async function createPrize(event) {
    event.preventDefault();

    const form = event.target;
    const payload = {
        name: form.name.value.trim(),
        category: form.category.value.trim(),
        pointsCost: Number(form.pointsCost.value),
    };

    const response = await fetch('/prize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        showMessage(data.error || 'Could not create prize.', true);
        return;
    }

    form.reset();
    showMessage(`Created ${data.name}.`, false);
    await readPrizes();
}

async function updatePrize(event) {
    event.preventDefault();

    const form = event.target;
    const prizeId = form.elements.id.value;
    const payload = {
        name: form.name.value.trim(),
        category: form.category.value.trim(),
        pointsCost: Number(form.pointsCost.value),
    };

    const response = await fetch(`/prize/${prizeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        showMessage(data.error || 'Could not update prize.', true);
        return;
    }

    showMessage(`Updated ${data.name}.`, false);
    await readPrizes();
    document.getElementById('updatePrizeId').value = String(data._id);
    loadPrizeIntoUpdateForm(data._id);
}

async function deletePrize(event) {
    event.preventDefault();

    const prizeId = event.target.elements.id.value;
    const response = await fetch(`/prize/${prizeId}`, {
        method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
        showMessage(data.error || 'Could not delete prize.', true);
        return;
    }

    showMessage(`Deleted ${data.name}.`, false);
    await readPrizes();
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
    document.getElementById('prizeMessage').hidden = true;
}

document.getElementById('createPrizeForm').addEventListener('submit', createPrize);
document.getElementById('updatePrizeForm').addEventListener('submit', updatePrize);
document.getElementById('deletePrizeForm').addEventListener('submit', deletePrize);
document.getElementById('updatePrizeId').addEventListener('change', function(event) {
    loadPrizeIntoUpdateForm(event.target.value);
});
