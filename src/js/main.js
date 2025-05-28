"use strict"

document.addEventListener('DOMContentLoaded', getData);

function showLoadingMessage() {
    const menuEl = document.getElementById("menuContainer");
    menuEl.innerHTML = `<h3>Laddar menyn...</h3>`;
}

//Asynkron funktion med try/catch för att hämta ut min data. 
async function getData() {
    showLoadingMessage();
    try {

        const response = await fetch("https://dt207g-project-restapi.onrender.com/api/menu");

        if (!response.ok) throw new Error("Nätverksfel");

        const data = await response.json();
        console.table(data);
        renderData(data);   //Anropar funktion som skriver ut datan på skärmen.
    } catch (error) {
        console.error("Fel vid hämtning:", error);
    } finally {
        console.log("Förfrågan avslutad.");
    }
}

//Skriv ut menyn på skärmen
function renderData(data) {
    const menuEl = document.getElementById("menuContainer");
    menuEl.innerHTML = '';

    data.forEach(menuItem => {
        const row = document.createElement('div');
        row.classList.add('menuItem');

        const veganIcon = menuItem.isVegan ? 'Vegansk 🌱' : '';

        row.innerHTML = `
            <h3>${menuItem.name}</h3>
            <p>${menuItem.description}</p>
            <p><strong>Pris:</strong> ${menuItem.price} kr</p>
            <p class="vegan">${veganIcon}</p>
            <button class="addBtn">BESTÄLL</button>
        `;

        menuEl.appendChild(row);
    });
}