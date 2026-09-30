// =====================================================
// SOLEMATE - SCRIPTS.JS
// =====================================================


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("solemateCart")) || [];

function saveCart() {
    localStorage.setItem("solemateCart", JSON.stringify(cart));
}


function addToCart(name, price) {

    let existing = cart.find(function(item) {
        return item.name === name;
    });

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    showMessage(name + " added to cart!");
}


function updateCart() {

    let cartCount = document.getElementById("cart-count");
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartCount || !cartItems || !cartTotal) {
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function(item) {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

    });

    cartCount.textContent = totalItems;

    cartTotal.textContent =
        totalPrice.toLocaleString("en-IN");


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-message">Your cart is empty.</p>';

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;


        let cartHTML =
            '<div class="cart-item">' +

                '<div class="cart-item-info">' +

                    '<strong>' +
                        item.name +
                    '</strong>' +

                    '<span class="cart-item-price">' +
                        '₹' +
                        item.price.toLocaleString("en-IN") +
                    '</span>' +

                '</div>' +

                '<div class="quantity-controls">' +

                    '<button onclick="changeQuantity(' +
                        index +
                        ', -1)">' +
                        '−' +
                    '</button>' +

                    '<strong>' +
                        item.quantity +
                    '</strong>' +

                    '<button onclick="changeQuantity(' +
                        index +
                        ', 1)">' +
                        '+' +
                    '</button>' +

                '</div>' +

                '<strong>' +
                    '₹' +
                    itemTotal.toLocaleString("en-IN") +
                '</strong>' +

                '<button class="remove-btn" ' +
                    'onclick="removeFromCart(' +
                    index +
                    ')">' +
                    'Remove' +
                '</button>' +

            '</div>';


        cartItems.innerHTML += cartHTML;

    });
}


function changeQuantity(index, amount) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();
    updateCart();
}


function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }

    let productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();
    updateCart();

    showMessage(productName + " removed from cart.");
}


function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    alert(
        "🎉 Order placed successfully!\n\n" +
        "Total Amount: ₹" +
        total.toLocaleString("en-IN") +
        "\n\nThank you for shopping with SoleMate!"
    );


    cart = [];

    saveCart();
    updateCart();
}


// ================= PRODUCT FILTER =================

function filterProducts(category) {

    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ================= SEARCH =================

function searchProducts() {

    let searchBox =
        document.getElementById("search");


    if (!searchBox) {
        return;
    }


    let searchText =
        searchBox.value.toLowerCase();


    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let name =
            product.getAttribute("data-name");

        let category =
            product.getAttribute("data-category");


        name = name.toLowerCase();
        category = category.toLowerCase();


        if (
            name.includes(searchText) ||
            category.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ================= SORT PRODUCTS =================

function sortProducts() {

    let select =
        document.getElementById("sortProducts");

    let grid =
        document.getElementById("product-grid");


    if (!select || !grid) {
        return;
    }


    let option = select.value;


    let products =
        Array.from(
            document.querySelectorAll(".product-card")
        );


    if (option === "low") {

        products.sort(function(a, b) {

            return Number(a.dataset.price) -
                   Number(b.dataset.price);

        });

    }


    if (option === "high") {

        products.sort(function(a, b) {

            return Number(b.dataset.price) -
                   Number(a.dataset.price);

        });

    }


    if (option === "rating") {

        products.sort(function(a, b) {

            return Number(b.dataset.rating) -
                   Number(a.dataset.rating);

        });

    }


    products.forEach(function(product) {

        grid.appendChild(product);

    });
}


// ================= WISHLIST =================

let wishlist =
    JSON.parse(
        localStorage.getItem("solemateWishlist")
    ) || [];


function saveWishlist() {

    localStorage.setItem(
        "solemateWishlist",
        JSON.stringify(wishlist)
    );
}


function toggleWishlist(button, name) {

    let index =
        wishlist.indexOf(name);


    if (index === -1) {

        wishlist.push(name);

        button.classList.add("active");

        button.textContent = "♥";

        showMessage(
            name + " added to wishlist!"
        );

    } else {

        wishlist.splice(index, 1);

        button.classList.remove("active");

        button.textContent = "♡";

        showMessage(
            name + " removed from wishlist."
        );

    }


    saveWishlist();
    updateWishlist();
}


function updateWishlist() {

    let count =
        document.getElementById("wishlist-count");


    let container =
        document.getElementById("wishlist-items");


    if (!count || !container) {
        return;
    }


    count.textContent = wishlist.length;


    if (wishlist.length === 0) {

        container.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;
    }


    container.innerHTML = "";


    wishlist.forEach(function(name, index) {

        container.innerHTML +=
            '<div class="wishlist-product">' +

                '<span>' +
                    '❤️ ' +
                    name +
                '</span>' +

                '<button onclick="removeWishlist(' +
                    index +
                ')">' +
                    '×' +
                '</button>' +

            '</div>';

    });
}


function removeWishlist(index) {

    if (!wishlist[index]) {
        return;
    }

    let productName = wishlist[index];

    wishlist.splice(index, 1);

    saveWishlist();
    updateWishlist();

    showMessage(
        productName +
        " removed from wishlist."
    );
}


// ================= LOGIN =================

function openLogin() {

    let modal =
        document.getElementById("login-modal");


    if (modal) {

        modal.classList.add("show");

    }
}


function closeLogin() {

    let modal =
        document.getElementById("login-modal");


    if (modal) {

        modal.classList.remove("show");

    }
}


function loginUser() {

    let usernameElement =
        document.getElementById("username");

    let emailElement =
        document.getElementById("email");

    let passwordElement =
        document.getElementById("password");


    if (
        !usernameElement ||
        !emailElement ||
        !passwordElement
    ) {

        alert("Login form could not be found.");

        return;
    }


    let username =
        usernameElement.value.trim();

    let email =
        emailElement.value.trim();

    let password =
        passwordElement.value.trim();


    if (
        username === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    if (password.length < 4) {

        alert(
            "Password must contain at least 4 characters."
        );

        return;
    }


    let user = {

        name: username,
        email: email

    };


    localStorage.setItem(
        "solemateUser",
        JSON.stringify(user)
    );


    closeLogin();

    updateLoginButton();

    showMessage(
        "Welcome " +
        username +
        "! 👋"
    );
}


function logoutUser() {

    localStorage.removeItem("solemateUser");

    updateLoginButton();

    showMessage(
        "You have been logged out."
    );
}


function updateLoginButton() {

    let button =
        document.getElementById("login-nav-btn");


    if (!button) {
        return;
    }


    let storedUser =
        localStorage.getItem("solemateUser");


    if (storedUser) {

        button.textContent = "Logout";

        button.onclick = logoutUser;

    } else {

        button.textContent = "Login";

        button.onclick = openLogin;

    }
}


// ================= DARK MODE =================

function toggleDarkMode() {

    document.body.classList.toggle("dark");


    let darkMode =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "solemateDarkMode",
        darkMode
    );
}


function loadDarkMode() {

    let darkMode =
        localStorage.getItem(
            "solemateDarkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add("dark");

    }
}


// ================= FEATURED PRODUCTS =================

function showFeatured() {

    let productsSection =
        document.getElementById("products");


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }


    setTimeout(function() {

        filterProducts("Premium");

    }, 500);
}


// ================= MESSAGE / TOAST =================

function showMessage(message) {

    let oldToast =
        document.querySelector(".toast");


    if (oldToast) {

        oldToast.remove();

    }


    let toast =
        document.createElement("div");


    toast.className = "toast";

    toast.textContent = message;


    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.background = "#111";
    toast.style.color = "white";
    toast.style.padding = "15px 22px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "5000";
    toast.style.fontSize = "15px";
    toast.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.25)";


    document.body.appendChild(toast);


    setTimeout(function() {

        if (toast) {

            toast.remove();

        }

    }, 2500);
}


// ================= SEARCH EVENT =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        let searchBox =
            document.getElementById("search");


        if (searchBox) {

            searchBox.addEventListener(
                "input",
                searchProducts
            );

        }

    }
);


// ================= PAGE LOAD =================

window.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCart();

        updateWishlist();

        updateLoginButton();

        loadDarkMode();


        // Restore wishlist hearts

        let heartButtons =
            document.querySelectorAll(
                ".heart-btn"
            );


        heartButtons.forEach(
            function(button) {

                let onclickText =
                    button.getAttribute(
                        "onclick"
                    );


                wishlist.forEach(
                    function(name) {

                        if (
                            onclickText &&
                            onclickText.includes(name)
                        ) {

                            button.classList.add(
                                "active"
                            );

                            button.textContent =
                                "♥";

                        }

                    }
                );

            }
        );

    }
);


// ================= CLOSE LOGIN MODAL =================

window.addEventListener(
    "click",
    function(event) {

        let modal =
            document.getElementById(
                "login-modal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeLogin();

        }

    }
);