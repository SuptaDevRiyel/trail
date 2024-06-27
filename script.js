document.addEventListener('DOMContentLoaded', () => {
    const showSheetButton = document.getElementById('showSheet');
    const showIndividualButton = document.getElementById('showIndividual');
    const querySection = document.getElementById('querySection');
    const queryButton = document.getElementById('queryButton');
    const output = document.getElementById('output');

    const sheetId = '1q2EcbZaqW8qSiNOqdJv7mHV3H6kVCrawyErlp9bJNHw';
    const apiKey = 'AIzaSyBU55OsD3DxAzNBJSmjEh9weRk0gR1zMtw';

    showSheetButton.addEventListener('click', () => {
        fetchSheetData().then(data => {
            displaySheetData(data);
        });
    });

    showIndividualButton.addEventListener('click', () => {
        querySection.classList.remove('hidden');
        output.innerHTML = '';
    });

    queryButton.addEventListener('click', () => {
        const name = document.getElementById('nameInput').value;
        fetchSheetData().then(data => {
            displayIndividualData(data, name);
        });
    });

    async function fetchSheetData() {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`);
        const result = await response.json();
        return result.values;
    }

    function displaySheetData(data) {
        let table = '<table><tr><th>Name</th><th>Age</th><th>Class</th><th>Date of Birth</th></tr>';
        data.slice(1).forEach(row => {
            table += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`;
        });
        table += '</table>';
        output.innerHTML = table;
    }

    function displayIndividualData(data, name) {
        const headers = data[0];
        const row = data.find(row => row[0].toLowerCase() === name.toLowerCase());
        if (row) {
            let table = '<table>';
            headers.forEach((header, index) => {
                table += `<tr><th>${header}</th><td>${row[index]}</td></tr>`;
            });
            table += '</table>';
            output.innerHTML = table;
        } else {
            output.innerHTML = 'No data found for the specified name.';
        }
    }
});
