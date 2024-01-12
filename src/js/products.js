import { getRequestQuoteItemsQuantity } from "./general";
import { addRequestQuoteItemsSlide } from "./request-quote-items";

/** Enable button to add product to cart when the quantity is changed */
window.enableBtnAddProductToCart = (el) => {
    const btnAddProductToCart = el.nextElementSibling;

    if (el.selectedIndex > 0) btnAddProductToCart.removeAttribute("disabled");
}

/** Add product to cart  */
window.addProductToCart = (el) => {
    const typeId = el.id.split("-")[3];
    const productId = el.id.split("-")[4];
    const cartQty = document.querySelector("#rm-request-products-qty");
    const productName = document.querySelector(`#rm-product-name-${typeId}-${productId}`);
    const productQty = document.querySelector(`#rm-product-qty-${typeId}-${productId}`);

    const totalProducts = Number(cartQty.innerText) + Number(productQty.value);

    cartQty.innerText = totalProducts;

    const data = {
        "type": "Products",
        "name": productName.value,
        "qty": productQty.value
    }

    // Add product to Request Quote slide
    addRequestQuoteItemsSlide(data);

    // Save products in local storage
    setLocalStorage("Rolimec", data);
    getRequestQuoteItemsQuantity();

    window.handleAlert();
}

/** Save product catalog item clicked on footer link in the localstorage */
window.setProductCatalog = (el) => {
    const productCatalog = el.dataset.productsCatalog;

    localStorage.setItem("Rolimec - Catálogo", productCatalog);
}

/** Get product catalog item clicked on footer link from localstorage */
export function getProductCatalog() {
    const products = document.querySelector("[data-page]");

    if (products && products.dataset.page === "products") {
        const catalog = localStorage.getItem("Rolimec - Catálogo");

        if (catalog) {
            const catalogTabs = document.querySelectorAll("button[id^='rm-pills-products-tab']");
            const catalogItems = document.querySelectorAll("div[id^='rm-pills-products']");
            const catalogButton = document.querySelector(`#rm-products button.${catalog}`);
            const catalogDiv = document.querySelector(`#rm-products div.${catalog}`);
    
            catalogTabs.forEach((tab) => {
                if (tab.classList.contains("active")) tab.classList.remove("active");
            });
    
            catalogItems.forEach((item) => {
                if (item.classList.contains("active")) item.classList.remove("active", "show");
            });
    
            catalogButton.classList.add("active");
            catalogDiv.classList.add("active", "show");
    
            localStorage.removeItem("Rolimec - Catálogo");
        }

        else {
            const firstTab = document.querySelector("#rm-pills-products-tab-1");
            const firstItem = document.querySelector("#rm-pills-products-1");

            firstTab.classList.add("active");
            firstItem.classList.add("active", "show");
        }
    }
}

/** Search product */
window.searchProduct = () => {
    const search = document.querySelector("#rm-products-search");
    const filter = search.value.toUpperCase();
    const activeCatalog = document.querySelector("div[id^='rm-pills-products'].active");
    const productsItems = document.querySelectorAll(`#${activeCatalog.id} .rm-products-item`);

    for (let i = 0; i < productsItems.length; i++) {
        const title = productsItems[i].getElementsByTagName("h4")[0];
        const titleValue = title.textContent || title.innerText;

        if (titleValue.toUpperCase().indexOf(filter) > -1) productsItems[i].style.display = "block";
        else productsItems[i].style.display = "none";
    }
}

/** Filter products by category */
window.filterProducts = (el) => {
    const category = el.dataset.category;
    const activeCatalog = document.querySelector("div[id^='rm-pills-products'].active");
    const productsItems = document.querySelectorAll(`#${activeCatalog.id} .rm-products-item`);
    const productsFilterLinks = document.querySelectorAll(".rm-products-filter li a");

    for (let i = 0; i < productsItems.length; i++) {
        if (productsItems[i].dataset.category === category) productsItems[i].style.display = "block";
        else productsItems[i].style.display = "none";
    }

    productsFilterLinks.forEach((link) => {
        if (link.dataset.category === category) link.classList.add("active");
        else link.classList.remove("active");
    });
}