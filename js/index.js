function showProduct() {
  location.href = "Product.html";
}

// function checkOut() {
//   location.href = "Check-out.html";
// }

function signUp(event) {
  // prevents page refresh
  event.preventDefault();



  // triggers the spining animation
  const spinItem = document.querySelector(".spin");
  spinItem.style.display = "inline-block";

  const getName = document.querySelector(".name").value;
   const getEmail = document.querySelector(".email").value;
    const getPhone = document.querySelector(".phone").value;
     const getPassword = document.querySelector(".password").value;
  // const getName = document.getElementById("name").value;
  // const getEmail = document.getElementById("email").value;
  // const getPhone = document.getElementById("phone").value;
  // const getPassword = document.getElementById("password").value;

  // validation
  if ( getName === ""  || getEmail === ""  || getPhone === "" || getPassword === "") {
     Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#f58634",
    });
    
    spinItem.style.display = "none";
    return;
  }
  // if (getConfirm !== getPassword) {
  //   Swal.fire({
  //     icon: "warning",
  //     text: "Passwords don't match",
  //     confirmButtonColor: "#2D85DE",
  //   });
  //   spinItem.style.display = "none";
  //   return;
  // } 

  if (getPassword.length <= 8){
    Swal.fire({
      icon: "warning",
      text: "Password must be more 8 characters!",
      confirmButtonColor: "#f58634",
    });

    spinItem.style.display = "none";
    return;
  }

  else {

    // console.log(getEmail, getName, getPhone, getPassword)
    // convert to form data
    const signData = {
      name: getName,
      email: getEmail,
      phone:getPhone,
      password: getPassword
    }
   

    // request method
    const signMethod = {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signData)
    };

    // endpoint
    const url =
      "http://localhost:3000/amazon/document/api/signup";

    // callimg the api
    fetch(url, signMethod)
      .then(response => response.json())
      .then(result => {
        console.log("Success", result);

        if (result.message === "success") {

          Swal.fire({
            icon: "info",
            title: "Error",
            confirmButtonColor: "#f58634",
          });
        } else {
          
             Swal.fire({
            icon: "success",
            title:"Account successfully created",
            confirmButtonColor: "#f58634",
          });

          setTimeout(() => {
            location.href = "Sign-in.html";
          }, 4000);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "info",
          title: "Error, Try again later",
          confirmButtonColor: "#f58634",
        });
        spinItem.style.display = "none";
      });
  }
}


// function signIn(event) {
//   event.preventDefault();


//   const spinItem = document.querySelector(".spin");
//   spinItem.style.display = "inline-block";

//   const getEmail = document.querySelector(".email").value;
//   const getPassword = document.querySelector(".password").value;
//   if (getEmail === "" || getPassword === "") {
//     Swal.fire({
//       icon: "info",
//       text: "All fields are required!",
//       confirmButtonColor: "#f58634",
//     });

//     spinItem.style.display = "none";
//     return;
//   }else {
//     const signData = {
//       email: getEmail,
//       password: getPassword
//     }
//     // this is for raw data
//     // const signData = JSON.stringify({
//     //     "email": getEmail,
//     //     "password": getPassword
//     // })


//   const signMethod = {
//       method: "POST",
//       headers:{
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(signData)
//     }


//    const url =
//       "http://localhost:3000/amazon/document/api/login";
//     fetch(url, signMethod)
//       .then(response => response.json())
//       .then(result => {
//         console.log(result);
//         if (result.hasOwnProperty("email")) {
//           localStorage.setItem("key", result.token);

//           location.href = "./index.html";

//         } else {
//           Swal.fire({
//             icon: "success",
//             title:"Successfully logged In",
//             confirmButtonColor: "#f58634",
//           });
//         }
//       })
//       .catch((error) => {
//         console.log("error", error);
//         Swal.fire({
//           icon: "info",
//           title: "Error, Try again later",
//           confirmButtonColor: "#f58634",
//         });
//       });
//   }
// }
function signIn(event) {
  event.preventDefault();

  const spinItem = document.querySelector(".spin");
  spinItem.style.display = "inline-block";

  const getEmail = document.querySelector(".email").value;
  const getPassword = document.querySelector(".password").value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#f58634",
    });

    spinItem.style.display = "none";
    return;
  } else {
    const signData = { email: getEmail, password: getPassword };

    const signMethod = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signData),
    };

    const url = "http://localhost:3000/amazon/document/api/login";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result && result.token) {
          // ✅ Save token + user object
          localStorage.setItem("token", result.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: result.email || getEmail,
              name: result.name || "Guest",
              loggedIn: true,
            })
          );

          Swal.fire({
            icon: "success",
            title: "Successfully logged In",
            confirmButtonColor: "#f58634",
          });

          // Redirect after short delay
          setTimeout(() => {
            location.href = "./index.html";
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            text: "Invalid email or password!",
            confirmButtonColor: "#f58634",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire({
          icon: "info",
          title: "Error, Try again later",
          confirmButtonColor: "#f58634",
        });
      })
      .finally(() => {
        spinItem.style.display = "none";
      });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const personIcon = document.getElementById("bi-sign");
  const personBtn = document.getElementById("person-btn");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token && user.loggedIn) {
    // ✅ Logged in → turn green & redirect to profile
    personIcon.style.color = "green";
    personBtn.addEventListener("click", () => {
      location.href = ""; // change to your dashboard/profile page
    });
  } else {
    // ❌ Not logged in → default color & redirect to sign-in
    personIcon.style.color = "";
    personBtn.addEventListener("click", () => {
      location.href = "./Sign-in.html";
    });
  }
});

function isLoggedIn() {
  const token = localStorage.getItem("token") || localStorage.getItem("key");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return token && user && user.loggedIn;
}



document.addEventListener("DOMContentLoaded", () => {
   showProducts();   // load all products
  backFiveProducts(); // load last 5 products into carousel
});document.addEventListener("DOMContentLoaded", () => {
   showProducts();   // load all products
  backFiveProducts(); // load last 5 products into carousel

});

// Fetch and render ALL products
async function showProducts() {
  try {
    const response = await fetch("http://localhost:3000/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();

    const container = document.getElementById("allProduct");
    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
      const productId = product._id || product.id;

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-3 mb-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" alt="${product.name}"
               class="card-img-top product-img productImage"
               onclick="goToProductDetails('${productId}')">
          <div class="card-body">
           <div class="d-flex mt-3" style="justify-content: space-between">
            <p style="color: #4d4d4d">Coconut Flakes</p>
            <button
  class="icon-btn add-to-wishlist"
  data-id="${productId}"
  style="color: #0f0b0b; background: none; outline: none; border: none;"
  aria-label="Wishlist"
>
  <i class="bi bi-heart wishlist-icon" data-id="${productId}"></i>
</button>
          </div>
            <p class="card-title mt-3">${product.name}</p>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">₦${product.price}</span>
             <p class="rating">
              <span class="" style="height: 22px; width: 24px; color: #f58634;">★</span>
              <span style="color: #4d4d4d">5.0 (18)</span>
            </p>            
            </div>
            <button type="button" class="btn btn-outline-success w-100 mt-2 add-to" data-id="${productId}">
              Add To Cart
            </button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Fetch and render ONLY the last 5 products
async function backFiveProducts() {
  try {
    const response = await fetch("http://localhost:3000/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();

    // Always show ONLY last 5 products
    const toShow = Array.isArray(products) ? products.slice(-5) : [];

    const container = document.getElementById("backFive");
    if (!container) return;

    container.innerHTML = "";

    toShow.forEach(product => {
      const productId = product._id || product.id;

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 mb-4 ";
       // makes it look like a carousel item
      col.style.flex = "0 0 25em";  // prevent shrinking
      col.style.height= "500px"

      col.innerHTML = `
        <img src="${product.image}" alt="${product.name}"
             class="card-img-top product-img productImage"
             onclick="goToProductDetails('${productId}')">
        <div class="card-body">
         <div class="d-flex mt-3" style="justify-content: space-between">
            <p style="color: #4d4d4d">Coconut Flakes</p>
      <button
  class="icon-btn add-to-wishlist"
  data-id="${productId}"
  style="color: #0f0b0b; background: none; outline: none; border: none;"
  aria-label="Wishlist"
>
  <i class="bi bi-heart wishlist-icon" data-id="${productId}"></i>
</button>
          </div>
          <p class="card-title mt-3">${product.name}</p>
           <div class="d-flex justify-content-between">
            <span class="fw-bold">₦${product.price}</span>
              <p class="rating">
              <span class="" style="height: 22px; width: 24px; color: #f58634;">★</span>
              <span style="color: #4d4d4d">5.0 (18)</span>
            </p>
          </div>
          <button type="button" class="btn btn-outline-success w-100 mt-2 add-to" data-id="${productId}">
            Add To Cart
          </button>
        </div>
      `;

      container.appendChild(col);
    });

    // turn container into horizontal scroll carousel
    container.style.display = "flex";
    container.style.overflowX = "auto";
    container.style.scrollBehavior = "smooth";

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Fetch and render ONLY the first 5 products
async function firstFiveProducts() {
  try {
    const response = await fetch("http://localhost:3000/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();

    // Always show ONLY first 5
    const toShow = Array.isArray(products) ? products.slice(0, 5) : [];

    const container = document.getElementById("firstFiveProducts");
    if (!container) return;

    container.innerHTML = "";

    toShow.forEach(product => {
      const productId = product._id || product.id;

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 mb-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" alt="${product.name}"
               class="card-img-top product-img productImage"
               onclick="goToProductDetails('${productId}')">
          <div class="card-body">
           <div class="d-flex mt-3" style="justify-content: space-between">
            <p style="color: #4d4d4d">Coconut Flakes</p>
            <button
  class="icon-btn add-to-wishlist"
  data-id="${productId}"
  style="color: #0f0b0b; background: none; outline: none; border: none;"
  aria-label="Wishlist"
>
  <i class="bi bi-heart wishlist-icon" data-id="${productId}"></i>
</button>
          </div>
             <p class="card-title mt-3">${product.name}</p>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">₦${product.price}</span>
              <p class="rating">
              <span class="" style="height: 22px; width: 24px; color: #f58634;">★</span>
              <span style="color: #4d4d4d">5.0 (18)</span>
            </p>           
             </div>
            <button type="button" class="btn btn-outline-success w-100 mt-2 add-to" data-id="${productId}">
              Add To Cart
            </button>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (error) {
    console.error("Error loading first 5 products:", error);
  }
}

// Load first 5 on page load
document.addEventListener("DOMContentLoaded", () => {
  firstFiveProducts();
});

//direct the imgage
function goToProductDetails(productId) {
  window.location.href = `Product-details.html?id=${productId}`;
}

// Load product details
async function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  productId = params.get("id");

  if (!productId) return;

  try {
    const response = await fetch(`http://localhost:3000/amazon/document/api/products/${productId}`);
    const product = await response.json();
    currentProduct = product; // ✅ save product globally

    // ✅ Name
    document.getElementById("productName").textContent = product.name || "Unnamed Product";

    // ✅ Prices
    const price = product.price || 0;
    document.getElementById("price").textContent = `₦${price}`;
    document.getElementById("oldPrice").textContent = price ? `₦${price + 500}` : "";

    // ✅ Main Image
    const imgElement = document.getElementById("mainImage");
    imgElement.src = product.image || "https://via.placeholder.com/300x300?text=No+Image";
    imgElement.alt = product.name || "Product Image";

    // ✅ Thumbnails
    const thumbs = document.querySelector(".thumbs");
    if (product.images && product.images.length > 0) {
      thumbs.innerHTML = product.images
        .map(img => `<img src="${img}" onclick="changeImage('${img}')">`)
        .join("");
    } else {
      thumbs.innerHTML = `<img src="${product.image}" onclick="changeImage('${product.image}')">`;
    }

    // ✅ Description
    document.getElementById("shortDesc").textContent = product.description || "No description available.";
    document.getElementById("longDesc").textContent = product.description || "No additional information available.";

    // ✅ Benefits
    document.getElementById("benefit").textContent =
      product.benefit && product.benefit.trim().length > 0 ? product.benefit : "No benefits listed.";

    // ✅ Ingredients
    document.getElementById("ingredients").textContent =
      product.ingredients && product.ingredients.length > 0 ? product.ingredients.join(", ") : "No ingredients listed.";

    // ✅ Varieties
    const varietiesDiv = document.getElementById("varieties");
    if (product.variety && product.variety.length > 0) {
      varietiesDiv.innerHTML = `<strong>Variety:</strong><ul>` +
        product.variety.map(v => `<li>${v.label || "Unnamed"} - ₦${v.price || "N/A"}</li>`).join("") +
        `</ul>`;
    } else {
      varietiesDiv.innerHTML = "<strong>Variety:</strong> None available.";
    }

  } catch (error) {
    console.error("Error loading product:", error);
    document.getElementById("productName").textContent = "Error loading product.";
  }
}

// ✅ Change image when thumbnail clicked
function changeImage(src) {
  document.getElementById("mainImage").src = src;
}



// ✅ Quantity adjustment
// function changeQty(val) {
//   qty = Math.max(1, qty + val);
//   document.getElementById("quantity").textContent = qty;
// }

// ✅ Quantity adjustment with live price + oldPrice update
function changeQty(val) {
  qty = Math.max(1, qty + val);
  document.getElementById("quantity").textContent = qty;

  if (currentProduct) {
    const basePrice = currentProduct.price || 0;
    const oldBase = currentProduct.oldPrice || (basePrice + 500);

    const total = basePrice * qty;
    const oldTotal = oldBase * qty;

    // Update displayed prices
    const priceEl = document.getElementById("price");
    const oldPriceEl = document.getElementById("oldPrice");

    if (priceEl) priceEl.textContent = `₦${total.toLocaleString()}`;
    if (oldPriceEl) oldPriceEl.textContent = `₦${oldTotal.toLocaleString()}`;
  }
}

// ✅ Init
document.addEventListener("DOMContentLoaded", () => {
  loadProductDetails();
  updateCartCount();

  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (currentProduct) {
        addToCart(currentProduct, qty); // ✅ full product
      }
    });
  }
});


// CART SYSTEM
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let qty = 1; 
let productId = null;
let currentProduct = null;

// ✅ Update the cart count in the badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
   const counters = document.querySelectorAll("#cartCount, #cartCountNav");
  counters.forEach(counter => {
    if (counter) counter.textContent = totalItems;
  });
}


// ✅ Add a product to cart (store full details)
function addToCart(product, qty = 1) {
  if (!product || !product._id) return;

  qty = Number(qty) || 1;

  // define oldPrice based on your rule
  const oldPrice = (product.price || 0) + 500;

  const existingItem = cart.find(item => item.id === product._id);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,       // discounted price
      oldPrice: oldPrice,         // original price (price + 500)
      image: product.image,
      qty: qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("✅ Product added to cart!");
}

// 3. Attach one global listener for Add To Cart and Wishlist
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to")) {
    const productId = e.target.dataset.id;
    handleAddToCart(productId);
  }
});

//product add to cart
async function handleAddToCart(productId) {
  try {
    const response = await fetch(`http://localhost:3000/amazon/document/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const product = await response.json();
    addToCart(product, 1); // default qty = 1
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
}

// Render products into the product card
showProducts();
backFiveProducts();
firstFiveProducts();

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cartItems");

  const totalEl = document.getElementById("totalPrice");
  const originalPriceEl = document.getElementById("originalPrice");
  const savingsEl = document.getElementById("savings");
  const shippingEl = document.getElementById("shipping");
  const taxEl = document.getElementById("tax");
  const totalItemsEl = document.getElementById("totalItems");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    originalPriceEl.textContent = "0";
    savingsEl.textContent = "0";
    shippingEl.textContent = "0";
    taxEl.textContent = "0";
    totalItemsEl.textContent = "0";
    updateCartCount();
    return;
  }

  let total = 0;
  let originalTotal = 0;
  let savings = 0;
  let totalItems = 0;

  cartItemsDiv.innerHTML = cart.map((item, index) => {
    const itemOriginal = (item.oldPrice || item.price) * item.qty;
    const itemTotal = (item.price || 0) * item.qty;
    const itemSavings = itemOriginal - itemTotal;

    originalTotal += itemOriginal;
    total += itemTotal;
    savings += itemSavings;
    totalItems += item.qty;

    return `
    <div class="d-lg-flex my-5 fw-bold" style="gap: 170px">
        <p>Item ${index + 1}</p>
        <div class="d-flex" style="gap: 17px">
          <u><span onclick="saveForLater('${item.id}')">Save for later</span></u>
          <u><span onclick="removeFromCart('${item.id}')">Remove</span></u>
          <p class="fw-bold">
            Qty: 
            <button class="mx-0 px-2" style="border: none" onclick="updateQty('${item.id}', -1)">-</button>
            <button class="mx-1 px-2" style="border: 1px solid #c4d1d0; background-color: #fff">${item.qty}</button>
            <button class="px-2" style="border: none" onclick="updateQty('${item.id}', 1)">+</button>
          </p>
        </div>
      </div>
      <hr class="pop-hr3" />
      <div class="d-flex" style="gap: 10px">
        <img src="${item.image || './assets/placeholder.png'}" alt="${item.name}" width="80" height="80" />
        <div class="mt-2">
          <p class="fw-bold" style="margin-bottom: 1px">${item.name}</p>
          <small>Cart ID: ${item.id}</small>
         <p>
            <span style="text-decoration: line-through; color:gray;">₦${(item.oldPrice || item.price).toLocaleString()}</span>
            <span class="fw-bold"> ₦${item.price.toLocaleString()}</span>
            × ${item.qty} = ₦${itemTotal.toLocaleString()}
          </p>
        </div>
      </div>
    `;
  }).join("");

  // shipping rule
  const shipping = total > 5000 ? 0 : 1500;
  const tax = Math.round(total * 0.05);
  const finalTotal = total + shipping + tax;

  // summary section
  originalPriceEl.textContent = `₦${originalTotal.toLocaleString()}`;
  savingsEl.innerHTML = `<span style="color:green; font-weight:bold;">₦${savings.toLocaleString()}</span>`;
  shippingEl.innerHTML = shipping === 0 
    ? `<span style="color:green; font-weight:bold;">Free</span>`
    : `₦${shipping.toLocaleString()}`;
  taxEl.textContent = `₦${tax.toLocaleString()}`;
  totalEl.textContent = `₦${finalTotal.toLocaleString()}`;

  totalItemsEl.textContent = totalItems;
  updateCartCount();
}

// Remove item
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Update item quantity
function updateQty(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => {
    if (item.id === id) {
      item.qty = Math.max(1, (Number(item.qty) || 1) + change);
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Optional: Save for later (can just remove from cart for now)
function saveForLater(id) {
  alert("Item saved for later (not yet implemented).");
}

document.addEventListener("DOMContentLoaded", renderCart);

// ====== WISHLIST SYSTEM ======

// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// Save wishlist
function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update wishlist count in navbar
function updateWishlistCount() {
  const count = wishlist.length;
  const counters = document.querySelectorAll("#wishlistCount, #wishlistCountNav");
  counters.forEach(counter => {
    if (counter) counter.textContent = count;
  });
}

// Update all wishlist icons
function updateWishlistIcons() {
  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    const id = icon.dataset.id;
    const inWishlist = wishlist.some(item => item.id === id);

    if (inWishlist) {
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill", "text-danger");
    } else {
      icon.classList.add("bi-heart");
      icon.classList.remove("bi-heart-fill", "text-danger");
    }
  });
}

// Toggle wishlist item
function toggleWishlist(product) {
  if (!product || !product._id) return;

  const exists = wishlist.find(item => item.id === product._id);

  if (exists) {
    wishlist = wishlist.filter(item => item.id !== product._id);
    alert("💔 Removed from wishlist!");
  } else {
    wishlist.push({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    alert("❤️ Added to wishlist!");
  }

  saveWishlist();
  updateWishlistCount();
  updateWishlistIcons();
  renderWishlistPage(); // refresh wishlist page if open
}

// Remove from wishlist (for wishlist page)
function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist();
  updateWishlistCount();
  renderWishlistPage();
}

// Move single item to cart
function moveToCart(id) {
  const product = wishlist.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist();
  saveCart();
  updateWishlistCount();
  renderWishlistPage();
  alert("✅ Moved to cart!");
}

// Move all items to cart
function moveAllToCart() {
  wishlist.forEach(item => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
  });

  wishlist = [];
  saveWishlist();
  saveCart();
  updateWishlistCount();
  renderWishlistPage();
  alert("✅ All items moved to cart!");
}

// Render wishlist page (table style)
function renderWishlistPage() {
  const container = document.getElementById("wishlistItems");
  const header = document.getElementById("wishlistHeader");
  const totalEl = document.getElementById("wishlistTotal");

  if (!container) return;

  container.innerHTML = "";

  if (wishlist.length === 0) {
    if (header) header.textContent = "Your wishlist is empty 💔";
    if (totalEl) totalEl.textContent = "₦0";
    container.innerHTML = `<tr><td colspan="5" class="text-center py-4">No items in wishlist</td></tr>`;
    return;
  }

  if (header) header.textContent = `${wishlist.length} items in your wishlist`;

  let total = 0;

  wishlist.forEach(item => {
    total += Number(item.price);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <button class="btn btn md" onclick="removeFromWishlist('${item.id}')">×</button>
      </td>
      <td>
        <div class="d-flex align-items-center">
          <img src="${item.image}" alt="${item.name}" width="60" height="60" class="me-3 rounded">
          <span class="fw-bold">${item.name}</span>
        </div>
      </td>
      <td>₦${item.price}</td>
      <td><span class="text-success">In Stock</span></td>
      <td>
        <button class="btn btn-success btn-sm" onclick="moveToCart('${item.id}')">Add to Cart</button>
      </td>
    `;
    container.appendChild(row);
  });

  if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

// Attach click listener (for all wishlist icons on products)
document.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-wishlist")) {
    const btn = e.target.closest(".add-to-wishlist");
    const productId = btn.dataset.id;
    handleWishlistToggle(productId);
  }
});

// Fetch product details and toggle
async function handleWishlistToggle(productId) {
  try {
    const response = await fetch(`http://localhost:3000/amazon/document/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const product = await response.json();
    toggleWishlist(product);
  } catch (err) {
    console.error("Error handling wishlist:", err);
  }
}

// Init when page loads
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount();
  updateWishlistIcons();
  renderWishlistPage();
});

//checkout 
// Attach Buy Now button after product loads
document.addEventListener("DOMContentLoaded", () => {
  const buyNowBtn = document.getElementById("buyNowBtn");

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      const productId = currentProduct?._id; // ensure you set currentProduct when fetching
      if (!productId) {
        alert("⚠️ Product ID not found");
        return;
      }
      buyNow(productId);
    });
  }
});

// Buy Now logic
// function buyNow(productId) {
//   if (!isLoggedIn()) {
//     // Redirect to login
//     window.location.href = "Sign-in.html";
//     return;
//   }

//   fetch(`http://localhost:3000/amazon/document/api/products/${productId}`)
//     .then(res => res.json())
//     .then(product => {
//       if (!product || !product._id) {
//         alert("⚠️ Failed to load product details");
//         return;
//       }

//       // Single product checkout cart
//       const checkoutCart = [{
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         qty: 1
//       }];

//       localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));

//       // Go to checkout page
//       window.location.href = "Check-out.html";
//     })
//     .catch(err => console.error("Error in Buy Now:", err));
// }

function buyNow(productId) {
  if (!isLoggedIn()) {
    window.location.href = "Sign-in.html";
    return;
  }

  fetch(`http://localhost:3000/amazon/document/api/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      if (!product || !product._id) {
        alert("⚠️ Failed to load product details");
        return;
      }

      currentProduct = product;

      // ✅ Save with actual qty
      const checkoutCart = [{
        id: product._id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || (product.price + 500),
        image: product.image,
        qty: qty
      }];

      localStorage.setItem("checkoutCart", JSON.stringify(checkoutCart));

      window.location.href = "Check-out.html";
    })
    .catch(err => console.error("Error in Buy Now:", err));
}




//proceed to check out button

function proceedToCheckout() {
  if (!isLoggedIn()) {
    // Redirect to login
    window.location.href = "Sign-in.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Save the whole cart for checkout
  localStorage.setItem("checkoutCart", JSON.stringify(cart));

  // Redirect to checkout page
  window.location.href = "Check-out.html";
}




function renderCheckoutSummary() {
  // Get checkoutCart first, else fallback to cart
  const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
  let cart = checkoutCart.length > 0 
    ? checkoutCart 
    : (JSON.parse(localStorage.getItem("cart")) || []);

  //  HTML elements
  const originalPriceEl = document.getElementById("checkoutOriginalPrice");
  const savingsEl = document.getElementById("checkoutSavings");
  const shippingEl = document.getElementById("checkoutShipping");
  const taxEl = document.getElementById("checkoutTax");
  const totalEl = document.getElementById("checkoutTotal");

  if (!cart || cart.length === 0) {
    originalPriceEl.textContent = "₦0";
    savingsEl.textContent = "₦0";
    shippingEl.textContent = "₦0";
    taxEl.textContent = "₦0";
    totalEl.textContent = "₦0";
    return;
  }

  let total = 0;
  let originalTotal = 0;
  let savings = 0;

  cart.forEach(item => {
    const oldPrice = item.oldPrice || (item.price + 500);
    const itemOriginal = oldPrice * (item.qty || 1);
    const itemTotal = item.price * (item.qty || 1);
    const itemSavings = itemOriginal - itemTotal;

    originalTotal += itemOriginal;
    total += itemTotal;
    savings += itemSavings;
  });

  // Shipping & tax rules
  const shipping = total > 5000 ? 0 : 1500;
  const tax = Math.round(total * 0.05);
  const finalTotal = total + shipping + tax;

  // ✅ Update DOM with ₦ formatting
  originalPriceEl.textContent = `₦${originalTotal.toLocaleString()}`;
  savingsEl.innerHTML = `<span style="color:green; font-weight:bold;">₦${savings.toLocaleString()}</span>`;
  shippingEl.innerHTML = shipping === 0 
    ? `<span style="color:green; font-weight:bold;">Free</span>` 
    : `₦${shipping.toLocaleString()}`;
  taxEl.textContent = `₦${tax.toLocaleString()}`;
  totalEl.textContent = `₦${finalTotal.toLocaleString()}`;
}

// Run on checkout page load
document.addEventListener("DOMContentLoaded", renderCheckoutSummary);

