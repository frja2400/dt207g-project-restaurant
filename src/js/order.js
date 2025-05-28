"use strict"

//Hämtar varukorg från localStorage och element som ska visa beställningar.
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderList = document.getElementById('orderList');

    if (cart.length === 0) {
        orderList.innerHTML = '<p>Varukorgen är tom.</p>';
        return;
    }

    //Skriv ut varje produkt på skärmen.
    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('orderItem');
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Antal: ${item.quantity}</p>
            <p>Pris/st: ${item.price} kr</p>
            <p>Total: ${item.price * item.quantity} kr</p>
            <hr>
        `;
        orderList.appendChild(div);
    });

    //Visa totalsumman längst ned.
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Totalt att betala: ${total} kr</h3>`;
    orderList.appendChild(totalDiv);
});