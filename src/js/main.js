"use strict"

//Anropa funktion för att visa meny och uppdatera varukorgsikon när sidan har laddats klart.
document.addEventListener('DOMContentLoaded', () => {
    getData();
    updateCartIcon();
});

//Visa laddningsmeddelande
function showLoadingMessage() {
    const menuEl = document.getElementById("menuContainer");
    menuEl.innerHTML = `<h3>Laddar menyn...</h3>`;
}

//Asynkron funktion som hämtar menydata från mitt API.
async function getData() {
    showLoadingMessage();
    try {
        const response = await fetch("https://dt207g-project-restapi.onrender.com/api/menu");
        if (!response.ok) throw new Error("Nätverksfel");

        const data = await response.json();
        console.table(data);
        renderData(data);
    } catch (error) {
        console.error("Fel vid hämtning:", error);
    } finally {
        console.log("Förfrågan avslutad.");
    }
}

//Skriv ut menydata på skärmen
function renderData(data) {
    const menuEl = document.getElementById("menuContainer");
    menuEl.innerHTML = '';

    //Skapa kategoribehållare
    const categories = {
        Pizza: [],
        Pasta: [],
        Dryck: []
    };

    // Sortera menyobjekt in i kategorier
    data.forEach(item => {
        const cat = item.category?.toLowerCase();
        if (cat === "pizza") categories.Pizza.push(item);
        else if (cat === "pasta") categories.Pasta.push(item);
        else if (cat === "dryck") categories.Dryck.push(item);
    });

    //Rendera varje kategori
    for (const [category, items] of Object.entries(categories)) {
        const section = document.createElement('section');
        section.classList.add('menuSection');

        const heading = document.createElement('h2');
        heading.textContent = category;
        heading.classList.add('menuTitle');
        section.appendChild(heading);

        items.forEach(menuItem => {
            const row = document.createElement('div');
            row.classList.add('menuItem');

            const veganIcon = menuItem.isVegan ? 'Vegansk 🌱' : '';

            row.innerHTML = `
                <h3>${menuItem.name}</h3>
                <p>${menuItem.description}</p>
                <p><strong>Pris:</strong> ${menuItem.price} kr</p>
                <p class="vegan">${veganIcon}</p>
            `;

            //Anropar addToCart-funktion vid klick
            const button = document.createElement('button');
            button.textContent = 'BESTÄLL';
            button.classList.add('addBtn');
            button.addEventListener('click', () => addToCart(menuItem));
            row.appendChild(button);

            section.appendChild(row);
        });

        //Lägg till varje sektion
        menuEl.appendChild(section);
    }
}

//Funktion för att läsa cart från localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

//Funktion för att spara cart i localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Lägg till i varukorg. Finns produkt så ökas antal med 1 och uppdaterar localStorage.
function addToCart(menuItem) {
    const cart = getCart();

    const existing = cart.find(item => item._id === menuItem._id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...menuItem, quantity: 1 });
    }

    saveCart(cart);
    updateCartIcon();
}

//Räknar total antal produkter
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

//Uppdaterar varukorgsikonen med rätt antal
function updateCartIcon() {
    const cartEl = document.getElementById('cartContainer');
    const count = getCartCount();

    cartEl.innerHTML = `
        <em class="fas fa-shopping-cart"></em>
        <span class="cart-count">${count}</span>
    `;
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        updateCartIcon();
    }
});