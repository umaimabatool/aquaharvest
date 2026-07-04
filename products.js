//==================================================
// products.js
// AquaHarvest Marketplace Engine
//==================================================

const PRODUCTS = [

{
id:1,
name:"Premium Floating Fish Feed",
category:"Feed",
price:28,
oldPrice:35,
rating:4.9,
badge:"Best Seller",
image:"assets/images/products/feed-1.jpg",
description:"High protein floating fish feed for rapid healthy growth."
},

{
id:2,
name:"Shrimp Booster Feed",
category:"Feed",
price:34,
oldPrice:42,
rating:4.8,
badge:"Popular",
image:"assets/images/products/feed-2.jpg",
description:"Premium shrimp nutrition formula."
},

{
id:3,
name:"Digital pH Meter",
category:"Equipment",
price:55,
oldPrice:70,
rating:4.9,
badge:"New",
image:"assets/images/products/ph-meter.jpg",
description:"Professional waterproof digital pH tester."
},

{
id:4,
name:"Water Oxygen Sensor",
category:"Sensors",
price:95,
oldPrice:120,
rating:5,
badge:"AI Ready",
image:"assets/images/products/oxygen.jpg",
description:"Real-time dissolved oxygen monitoring."
},

{
id:5,
name:"Fish Disease Medicine",
category:"Medicine",
price:22,
oldPrice:29,
rating:4.7,
badge:"Hot",
image:"assets/images/products/medicine1.jpg",
description:"Effective treatment for bacterial infections."
},

{
id:6,
name:"Shrimp Mineral Mix",
category:"Medicine",
price:19,
oldPrice:24,
rating:4.6,
badge:"Top Rated",
image:"assets/images/products/mineral.jpg",
description:"Improves shrimp immunity and growth."
},

{
id:7,
name:"Automatic Fish Feeder",
category:"Equipment",
price:180,
oldPrice:220,
rating:5,
badge:"Premium",
image:"assets/images/products/feeder.jpg",
description:"Programmable automatic fish feeder."
},

{
id:8,
name:"Smart Pond Camera",
category:"AI Devices",
price:320,
oldPrice:399,
rating:5,
badge:"AI",
image:"assets/images/products/camera.jpg",
description:"AI-powered underwater monitoring camera."
},

{
id:9,
name:"Ammonia Test Kit",
category:"Water",
price:32,
oldPrice:40,
rating:4.8,
badge:"Essential",
image:"assets/images/products/ammonia.jpg",
description:"Instant ammonia level testing."
},

{
id:10,
name:"Water Thermometer",
category:"Sensors",
price:16,
oldPrice:22,
rating:4.7,
badge:"Sale",
image:"assets/images/products/temp.jpg",
description:"Digital waterproof thermometer."
},

{
id:11,
name:"Fish Net",
category:"Equipment",
price:18,
oldPrice:24,
rating:4.6,
badge:"New",
image:"assets/images/products/net.jpg",
description:"Professional harvesting net."
},

{
id:12,
name:"Portable Aerator",
category:"Equipment",
price:120,
oldPrice:145,
rating:4.9,
badge:"Hot",
image:"assets/images/products/aerator.jpg",
description:"Portable oxygen aerator."
}

];

//==================================================
// DOM
//==================================================

const productGrid=document.getElementById("productGrid");
const searchInput=document.getElementById("searchInput");
const filterSelect=document.getElementById("categoryFilter");

//==================================================
// Load Products
//==================================================

function loadProducts(list=PRODUCTS){

if(!productGrid) return;

productGrid.innerHTML="";

list.forEach(product=>{

productGrid.innerHTML+=`

<div class="col-lg-4 col-md-6 mb-4">

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

<span class="product-badge">
${product.badge}
</span>

</div>

<div class="product-content">

<div class="product-category">
${product.category}
</div>

<h4 class="product-title">
${product.name}
</h4>

<div class="product-rating">

${generateStars(product.rating)}

<span class="ms-2">${product.rating}</span>

</div>

<div class="product-price">

$${product.price}

<span class="old-price">

$${product.oldPrice}

</span>

</div>

<div class="product-actions">

<button
class="btn btn-primary"
onclick="addToCart(${product.id})">

<i class="bi bi-cart-plus"></i>

Add To Cart

</button>

<button
class="btn btn-outline-light"
onclick="openProduct(${product.id})">

View

</button>

</div>

</div>

</div>

</div>

`;

});

}

//==================================================
// Stars
//==================================================

function generateStars(rating){

let html="";

for(let i=1;i<=5;i++){

html+=`<i class="bi ${
i<=Math.round(rating)
?"bi-star-fill"
:"bi-star"
}"></i>`;

}

return html;

}

//==================================================
// Search
//==================================================

if(searchInput){

searchInput.addEventListener("input",e=>{

const keyword=e.target.value.toLowerCase();

const filtered=PRODUCTS.filter(product=>

product.name.toLowerCase().includes(keyword) ||

product.category.toLowerCase().includes(keyword)

);

loadProducts(filtered);

});

}

//==================================================
// Category Filter
//==================================================

if(filterSelect){

filterSelect.addEventListener("change",()=>{

if(filterSelect.value==="All"){

loadProducts();

return;

}

const filtered=PRODUCTS.filter(product=>

product.category===filterSelect.value

);

loadProducts(filtered);

});

}

//==================================================
// Product Modal
//==================================================

function openProduct(id){

const product=PRODUCTS.find(p=>p.id===id);

if(!product) return;

document.getElementById("productModalTitle").innerHTML=product.name;

document.getElementById("productModalBody").innerHTML=`

<img src="${product.image}" class="img-fluid rounded-4 mb-4">

<h4>$${product.price}</h4>

<p>${product.description}</p>

<div class="mt-4">

<button
class="btn btn-primary w-100"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

`;

const modal=new bootstrap.Modal(

document.getElementById("productModal")

);

modal.show();

}

//==================================================
// Featured Products
//==================================================

function featuredProducts(){

return PRODUCTS.slice(0,6);

}

//==================================================
// Latest Products
//==================================================

function latestProducts(){

return PRODUCTS.slice(-6);

}

//==================================================
// Best Sellers
//==================================================

function bestProducts(){

return PRODUCTS.filter(

p=>p.rating>=4.9

);

}

//==================================================

loadProducts();
window.PRODUCTS=PRODUCTS;
window.openProduct=openProduct;