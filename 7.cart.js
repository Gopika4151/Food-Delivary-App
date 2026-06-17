// Add Item To Cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " Added To Cart Successfully!");
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartIcon = document.querySelector(".cart-icon");

    if (cartIcon) {
        cartIcon.innerText = `Cart (${cart.length})`;
    }
}

// Display Cart Items (REDESIGNED FOR PURE BLACK PREMIUM BOXES)
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("liveCartItemsRendererNode");
    let totalElement = document.getElementById("cartGrandTotalValueElement");

    if (!container) return;

    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
        <div class="empty-state-notice" style="text-align:center; padding:40px; color:#888;">
            <h3>Your Cart Is Empty</h3>
            <p style="margin-top:10px;">Go back to Menu and add some delicious meals!</p>
        </div>`;

        if (totalElement) totalElement.innerText = "₹0";
        return;
    }

    cart.forEach((item, index) => {
        total += Number(item.price);

        // Inga thaan namma CSS classes-ai link panni dynamic horizontal pure black boxes uruvakkurom
        container.innerHTML += `
        <div class="cart-rendered-row-item">
            
            <div class="cart-left-img-wrapper">
                <img src="${item.image}" class="cart-row-thumbnail-img" alt="${item.name}">
            </div>
            
            <div class="cart-row-meta-content">
                <h4>${item.name}</h4>
                <p class="cart-row-price-badge">₹${item.price}</p>
                <p style="margin:0; font-size:0.85rem; color:#ff8c00;">⭐⭐⭐⭐⭐ 4.8 Rating</p>
            </div>
            
            <div class="cart-action-right-wrapper">
                <button class="cart-row-delete-trigger" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>

        </div>`;
    });

    if (totalElement) {
        totalElement.innerText = "₹" + total;
    }
}

// Remove Item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    displayCart();
    updateCartCount();
}

// Place Order
function executeFinalCheckoutPurge() {
    alert("🎉 Order Placed Successfully!");
    localStorage.removeItem("cart");
    window.location.href = "3.menu.html";
}

// Page Load Initializer
window.onload = function () {
    updateCartCount();
    displayCart();
};
function extractAndRenderCart() {
    const listContainer = document.getElementById('liveCartItemsRendererNode');
    const totalDisplay = document.getElementById('cartGrandTotalValueElement');

    const urlParams = new URLSearchParams(window.location.search);
    const foodName = urlParams.get('name');
    const foodPrice = urlParams.get('price');
    const foodImg = urlParams.get('img');

    listContainer.innerHTML = "";

    if (!foodName || !foodPrice) {
        listContainer.innerHTML = `
            <div class="empty-state-notice" style="color: #666; text-align: center; padding: 40px;">
                Your Cart is empty. Go back to Menu and add some delicious meals!
            </div>`;
        totalDisplay.innerText = "₹0";
        return;
    }

    const modularRowNode = document.createElement('div');
    modularRowNode.className = 'cart-rendered-row-item';
    modularRowNode.innerHTML = `
        <img src="${foodImg}" class="cart-row-thumbnail-img" alt="food display" style="width:70px; height:70px; object-fit:cover; border-radius:8px;">
        <div class="cart-row-meta-content" style="flex-grow: 1; padding-left: 15px;">
            <h4 style="margin-bottom: 5px;">${foodName}</h4>
            <p class="cart-row-price-badge" style="color: #ff8c00; font-weight: bold;">₹${foodPrice}</p>
        </div>
        <button class="cart-row-delete-trigger" onclick="clearCartView()">Remove</button>
    `;
    listContainer.appendChild(modularRowNode);

    totalDisplay.innerText = "₹" + foodPrice;
}

function clearCartView() {
    window.location.href = "5.cart.html";
}

function executeFinalCheckoutPurge() {
    alert('Congratulations! Your premium order sequence has been successfully parsed and transmitted.');
    window.location.href = "3.menu.html";
}

window.onload = function () {
    updateCartCount();
    displayCart();
};