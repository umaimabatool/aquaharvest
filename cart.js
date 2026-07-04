//==================================================
// cart.js
// AquaHarvest Shopping Cart System
//==================================================

const CART_KEY = "aquaharvest_cart";
const WISHLIST_KEY = "aquaharvest_wishlist";

//==================================================
// Get Cart
//==================================================

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

//==================================================
// Save Cart
//==================================================

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

//==================================================
// Add To Cart
//==================================================

function addToCart(id) {

    const product = PRODUCTS.find(p => p.id === id);

    if (!product) return;

    let cart = getCart();

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart(cart);

    if (typeof showToast === "function") {
        showToast(product.name + " added to cart");
    }

}

//==================================================
// Remove Item
//==================================================

function removeFromCart(id){

    let cart=getCart();

    cart=cart.filter(item=>item.id!==id);

    saveCart(cart);

    renderCart();

}

//==================================================
// Increase Quantity
//==================================================

function increaseQuantity(id){

    let cart=getCart();

    const item=cart.find(i=>i.id===id);

    if(item){

        item.quantity++;

    }

    saveCart(cart);

    renderCart();

}

//==================================================
// Decrease Quantity
//==================================================

function decreaseQuantity(id){

    let cart=getCart();

    const item=cart.find(i=>i.id===id);

    if(!item) return;

    item.quantity--;

    if(item.quantity<=0){

        cart=cart.filter(i=>i.id!==id);

    }

    saveCart(cart);

    renderCart();

}

//==================================================
// Clear Cart
//==================================================

function clearCart(){

    localStorage.removeItem(CART_KEY);

    updateCartBadge();

    renderCart();

}

//==================================================
// Badge Update
//==================================================

function updateCartBadge(){

    const badge=document.getElementById("cartCount");

    if(!badge) return;

    const total=getCart().reduce(

        (sum,item)=>sum+item.quantity,

        0

    );

    badge.innerText=total;

}

//==================================================
// Wishlist
//==================================================

function getWishlist(){

    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

}

function addToWishlist(id){

    let wishlist=getWishlist();

    if(!wishlist.includes(id)){

        wishlist.push(id);

    }

    localStorage.setItem(

        WISHLIST_KEY,

        JSON.stringify(wishlist)

    );

    updateWishlistBadge();

    if(typeof showToast==="function"){

        showToast("Added to wishlist");

    }

}

function updateWishlistBadge(){

    const badge=document.getElementById("wishlistCount");

    if(!badge) return;

    badge.innerText=getWishlist().length;

}

//==================================================
// Render Cart Page
//==================================================

function renderCart(){

    const container=document.getElementById("cartItems");

    const subtotalElement=document.getElementById("cartSubtotal");

    const taxElement=document.getElementById("cartTax");

    const totalElement=document.getElementById("cartTotal");

    if(!container) return;

    const cart=getCart();

    container.innerHTML="";

    if(cart.length===0){

        container.innerHTML=`

        <div class="text-center py-5">

            <i class="bi bi-cart-x display-1 text-secondary"></i>

            <h3 class="mt-3">Your Cart is Empty</h3>

            <a href="market.html" class="btn btn-primary mt-4">

                Continue Shopping

            </a>

        </div>

        `;

        if(subtotalElement) subtotalElement.innerText="$0.00";
        if(taxElement) taxElement.innerText="$0.00";
        if(totalElement) totalElement.innerText="$0.00";

        return;

    }

    let subtotal=0;

    cart.forEach(item=>{

        subtotal+=item.price*item.quantity;

        container.innerHTML+=`

<div class="glass-card mb-4">

<div class="row align-items-center">

<div class="col-lg-2">

<img src="${item.image}" class="img-fluid rounded-4">

</div>

<div class="col-lg-3">

<h5>${item.name}</h5>

<p>${item.category}</p>

</div>

<div class="col-lg-2">

<h5>$${item.price}</h5>

</div>

<div class="col-lg-3">

<div class="d-flex align-items-center gap-2">

<button

class="btn btn-sm btn-outline-light"

onclick="decreaseQuantity(${item.id})"

>

-

</button>

<span>${item.quantity}</span>

<button

class="btn btn-sm btn-outline-light"

onclick="increaseQuantity(${item.id})"

>

+

</button>

</div>

</div>

<div class="col-lg-2 text-end">

<button

class="btn btn-danger"

onclick="removeFromCart(${item.id})"

>

<i class="bi bi-trash"></i>

</button>

</div>

</div>

</div>

`;

    });

    const tax=subtotal*0.10;

    const total=subtotal+tax;

    if(subtotalElement){

        subtotalElement.innerText="$"+subtotal.toFixed(2);

    }

    if(taxElement){

        taxElement.innerText="$"+tax.toFixed(2);

    }

    if(totalElement){

        totalElement.innerText="$"+total.toFixed(2);

    }

}

//==================================================
// Checkout
//==================================================

function checkout(){

    const cart=getCart();

    if(cart.length===0){

        showToast("Cart is empty","error");

        return;

    }

    localStorage.removeItem(CART_KEY);

    updateCartBadge();

    showToast("Order Placed Successfully!");

    setTimeout(()=>{

        window.location.href="checkout.html";

    },1200);

}

//==================================================
// Buy Now
//==================================================

function buyNow(id){

    addToCart(id);

    window.location.href="cart.html";

}

//==================================================
// Initialization
//==================================================

document.addEventListener("DOMContentLoaded",()=>{

    updateCartBadge();

    updateWishlistBadge();

    renderCart();

});

//==================================================
// Export
//==================================================

window.addToCart=addToCart;
window.removeFromCart=removeFromCart;
window.increaseQuantity=increaseQuantity;
window.decreaseQuantity=decreaseQuantity;
window.clearCart=clearCart;
window.checkout=checkout;
window.buyNow=buyNow;
window.addToWishlist=addToWishlist;