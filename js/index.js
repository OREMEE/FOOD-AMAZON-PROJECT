function showProduct() {
  location.href = "Product.html";
}

function checkOut() {
  location.href = "Check-out.html";
}

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
  }else {
    const signData = {
      email: getEmail,
      password: getPassword
    }
    // this is for raw data
    // const signData = JSON.stringify({
    //     "email": getEmail,
    //     "password": getPassword
    // })


  const signMethod = {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signData)
    }


   const url =
      "http://localhost:3000/amazon/document/api/login";
    fetch(url, signMethod)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.hasOwnProperty("email")) {
          localStorage.setItem("key", result.token);

          location.href = "./index.html";

        } else {
          Swal.fire({
            icon: "success",
            title:"Successfully logged In",
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
      });
  }
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

// async function showProducts() {
//   try {
//     const response = await fetch("http://localhost:3000/amazon/document/api/products");
//     if (!response.ok) throw new Error("Failed to fetch products");

//     const products = await response.json();

//     const container = document.getElementById("allProduct");
//     if (!container) return;

//     container.innerHTML = "";

//     products.forEach(product => {
//       const productId = product._id || product.id;

//       const col = document.createElement("div");
//       col.className = "col-12 col-md-6 col-lg-3 mb-4";

//       col.innerHTML = `
//         <div class="card h-100 shadow-sm">
//           <img src="${product.image}" alt="${product.name}"
//                class="card-img-top product-img productImage"
//                onclick="goToProductDetails('${productId}')">
//           <div class="card-body">
//             <p class="card-title mt-3">${product.name}</p>
//             <div class="d-flex justify-content-between">
//               <span class="fw-bold">₦${product.price}</span>
//               <p class="rating">
//                 <span style="color: #f58634;">★</span>
//                 <span style="color: #4d4d4d">5.0 (18)</span>
//               </p>            
//             </div>
//             <button type="button" 
//                     class="btn btn-outline-success w-100 mt-2 add-to-cart"
//                     data-id="${productId}">
//               Add To Cart
//             </button>
//           </div>
//         </div>
//       `;

//       container.appendChild(col);

//       // ⬇️ Attach click directly to the button we just created
//       const btn = col.querySelector(".add-to-cart");
//       btn.addEventListener("click", () => {
//         addToCart(productId);  // use the helper below
//       });
//     });

//   } catch (error) {
//     console.error("Error loading products:", error);
//   }
// }

// add to cart

// function getCart() {
//   const raw = localStorage.getItem("cart");
//   try {
//     return JSON.parse(raw) || [];
//   } catch {
//     return [];
//   }
// }

// function saveCart(cart) {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// function updateCartCount() {
//   const badge = document.getElementById("cartCount");
//   if (!badge) return;

//   const cart = getCart();
//   badge.textContent = cart.length; // show the count
// }

// function addToCart(productId) {
//   const cart = getCart();
//   cart.push({ id: productId });
//   saveCart(cart);
//   updateCartCount();
// }

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
          <p class="card-title mt-3">${product.name}</p>
           <div class="d-flex justify-content-between">
            <span class="fw-bold">₦${product.price}</span>
              <p class="rating">
              <span class="" style="height: 22px; width: 24px; color: #f58634;">★</span>
              <span style="color: #4d4d4d">5.0 (18)</span>
            </p>
          </div>
          <button type="button" class="btn btn-outline-success w-100 mt-2">
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
             <p class="card-title mt-3">${product.name}</p>
            <div class="d-flex justify-content-between">
              <span class="fw-bold">₦${product.price}</span>
              <p class="rating">
              <span class="" style="height: 22px; width: 24px; color: #f58634;">★</span>
              <span style="color: #4d4d4d">5.0 (18)</span>
            </p>           
             </div>
            <button type="button" class="btn btn-outline-success w-100 mt-2">
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


// for product details

async function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) return;

  try {
    const response = await fetch(`http://localhost:3000/amazon/document/api/products/${productId}`);
    const product = await response.json();

    // ✅ Name
    document.getElementById("productName").textContent = product.name || "Unnamed Product";

    // ✅ Prices
    const price = product.price || 0;
    document.getElementById("price").textContent = `₦${price}`;
    document.getElementById("oldPrice").textContent = price ? `₦${price + 500}` : "";

    // ✅ Image (fallback placeholder if missing)
    const imgElement = document.getElementById("mainImage");
    imgElement.src = product.image || "https://via.placeholder.com/300x300?text=No+Image";
    imgElement.alt = product.name || "Product Image";

// Main image
document.getElementById("mainImage").src = product.image;

// Thumbnails
const thumbs = document.querySelector(".thumbs");
if (product.images && product.images.length > 0) {
  thumbs.innerHTML = product.images
    .map(img => `<img src="${img}" onclick="changeImage('${img}')">`)
    .join("");
} else {
  thumbs.innerHTML = `<img src="${product.image}" onclick="changeImage('${product.image}')">`;
}


    // ✅ Description
    document.getElementById("shortDesc").textContent =
      product.description || "No description available.";
    document.getElementById("longDesc").textContent =
      product.description || "No additional information available.";

    // ✅ Benefits
    document.getElementById("benefit").textContent =
      product.benefit && product.benefit.trim().length > 0
        ? product.benefit
        : "No benefits listed.";

    // ✅ Ingredients
    document.getElementById("ingredients").textContent =
      product.ingredients && product.ingredients.length > 0
        ? product.ingredients.join(", ")
        : "No ingredients listed.";

    // ✅ Varieties
    const varietiesDiv = document.getElementById("varieties");
    if (product.variety && product.variety.length > 0) {
      varietiesDiv.innerHTML = `<strong>Variety:</strong><ul>` +
        product.variety.map(v =>
          `<li>${v.label || "Unnamed"} - ₦${v.price || "N/A"}</li>`
        ).join("") +
        `</ul>`;
    } else {
      varietiesDiv.innerHTML = "<strong>Variety:</strong> None available.";
    }
  } catch (error) {
    console.error("Error loading product:", error);
    document.getElementById("productName").textContent = "Error loading product.";
  }
}

// Change image when thumbnail clicked
function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

// Quantity adjustment
let qty = 1;
function changeQty(val) {
  qty = Math.max(1, qty + val);
  document.getElementById("quantity").textContent = qty;
}

loadProductDetails();









//  <p class="card-text">
//               ${product.description.length > 60 ? product.description.substring(0, 60) + "..." : product.description}
//             </p>