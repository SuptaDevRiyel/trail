document.addEventListener('DOMContentLoaded', () => {
    const showSheetButton = document.getElementById('showSheet');
    const showIndividualButton = document.getElementById('showIndividual');
    const querySection = document.getElementById('querySection');
    const queryButton = document.getElementById('queryButton');
    const output = document.getElementById('output');

    const sheetId = '1Ras1nTJGPq1T7qjdCGgYX_qgDXQAIXefAdV7TUH8V5k';
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
        let table = '<table><tr><th>Serial</th><th>Name</th><th>Father\'s Name</th><th>Mother\'s Name</th><th>Class</th><th>Age</th><th>School\'s Name</th><th>Address</th></tr>';
        data.slice(1).forEach(row => {
            table += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td><td>${row[7]}</td></tr>`;
        });
        table += '</table>';
        output.innerHTML = table;
    }

    function displayIndividualData(data, name) {
        const headers = data[0];
        const row = data.find(row => row[1].toLowerCase() === name.toLowerCase());
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
