import { initRequestQuoteItemsSlide, removeRequestQuoteItemsSlide } from "../../src/js/request-quote-items.js";

/** Get quantity of items to Request Quote from local storage */
export function getRequestQuoteItemsQuantity() {
    const requestQuoteQty = document.querySelector("#rm-request-products-qty");
    const cartItems = getLocalStorage("Rolimec");

    if (requestQuoteQty) {
        if (cartItems) {
            const totalCartItems = cartItems.reduce((acc, curr) => acc + Number(curr.value.qty), 0);
        
            requestQuoteQty.innerText = totalCartItems;
        }

        else requestQuoteQty.innerText = 0;
    }
}

/** Get request quote item from local storage */
export function getRequestQuoteItems() {
    const requestQuoteProducts = document.querySelector("#rm-request-products");

    if (requestQuoteProducts) {
        requestQuoteProducts.classList.remove("d-none");
        
        const wrapper = document.querySelector("#rm-request-products-wrapper");
        const cartItems = getLocalStorage("Rolimec");

        if (cartItems && cartItems.length === 0) requestQuoteProducts.classList.add("d-none");

        if (wrapper && cartItems) {
            cartItems.forEach((cartItem, index) => {
                const itemNameImage = cartItem.value.name.toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replaceAll(" ", "-");

                const imgSrc = wrapper.classList.contains("rm-request-products-internal") ? 
                    `../src/img/products/${itemNameImage}-md.jpg` : 
                    `./src/img/products/${itemNameImage}-md.jpg`;

                wrapper.insertAdjacentHTML("beforeend", `
                    <article class="swiper-slide rm-slide-article" id="rm-request-item-${index + 1}">
                        <form action="#" class="rm-slide-data">
                            <input type="hidden" id="rm-request-item-name-${index + 1}"
                                value="${cartItem.value.name}">
                            <input type="hidden" id="rm-request-item-type-${index + 1}"
                                value="${cartItem.value.type}">
                            
                            <figure>
                                <span class="badge rounded-pill" id="rm-request-item-qty-${index + 1}">
                                    ${cartItem.value.qty}
                                </span>
                                <img src="${imgSrc}" alt="${cartItem.value.name}">
                            </figure>
                            
                            <button type="button" class="btn rm-request-item-remove"
                                id="rm-request-item-remove-${index + 1}"
                                onclick="return window.removeRequestQuoteItem(this)">
                                Excluir
                            </button>
                        </form>
                    </article>
                `);
            });

            initRequestQuoteItemsSlide();
        }
    }
}

/** Remove item from Request Quote */
window.removeRequestQuoteItem = (el) => {
    const itemId = el.id.split("-")[4];
    const requestItemName = document.querySelector(`#rm-request-item-name-${itemId}`);
    const requestItemType = document.querySelector(`#rm-request-item-type-${itemId}`);
    const cartItems = getLocalStorage("Rolimec");

    if (cartItems) {
        const item = cartItems.find((cartItem) => cartItem.value.name === requestItemName.value);

        // Remove item from local storage
        cartItems.splice(cartItems.indexOf(item), 1);
        window.localStorage.setItem("Rolimec", JSON.stringify(cartItems));

        // Remove slide
        removeRequestQuoteItemsSlide();
    }
}

/** Handle alert when a product or service is add to cart */
window.handleAlert = () => {
    const alert = document.querySelector(".rm-alert-cart");
    const headerHeight = document.querySelector("#rm-header").clientHeight;

    if (alert) {
        alert.style.top = `${headerHeight}px`;

        if (!alert.classList.contains("show")) {
            alert.classList.add("show");
            alert.style.display = "block";
        }

        setTimeout(() => {
            alert.classList.remove("show");
            alert.style.display = "none";
        }, 3000);
    }
}

/** Handle alerts position when pages scroll */
export function changeAlertTop() {
    const alert = document.querySelector(".rm-alert-cart");
    const headerHeight = document.querySelector("#rm-header").clientHeight;

    if (alert) {
        if (window.scrollY === 0) {
            if (window.matchMedia("(max-width: 991px)").matches) alert.style.top = "93px";
            else alert.style.top = "120px";
        }
    
        else alert.style.top = `${headerHeight}px`;
    }
}

/** Saving the product/service added to the cart in Local Storage with a TTL */
window.setLocalStorage = (key, value) => {
    const data = [{
        value
    }];

    const cartItems = getLocalStorage(key);

    if (cartItems) {
        const itemFounded = cartItems.find((cartItem) => data[0].value.name === cartItem.value.name);

        if (itemFounded) {
            cartItems.forEach((cartItem) => {
                if (cartItem.value.name === data[0].value.name) {
                    cartItem.value.qty = `${Number(cartItem.value.qty) + Number(data[0].value.qty)}`;
                }
            });
        }

        else cartItems.push(data[0]);
        
        localStorage.setItem(key, JSON.stringify(cartItems));
    }

    else localStorage.setItem(key, JSON.stringify(data));
}

/** Get the product/service from Local Storage */
window.getLocalStorage = (key) => {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

    return item;
}