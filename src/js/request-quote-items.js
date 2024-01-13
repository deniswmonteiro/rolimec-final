import { getRequestQuoteItemsQuantity } from "../../src/js/general.js";

/** Swiper */
export function initRequestQuoteItemsSlide() {
    new Swiper("#rm-request-products .rm-slide-content", {
        slidesPerView: 3,
        spaceBetween: 10,
        grabCursor: true,
      
        pagination: {
            el: "#rm-request-products .swiper-pagination",
            clickable: true,
        },

        breakpoints:{
            500: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 8,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
}

/** Add an item to Request Quote slide */
export function addRequestQuoteItemsSlide(data) {
    const requestQuoteProducts = document.querySelector("#rm-request-products");

    requestQuoteProducts.classList.remove("d-none");
    
    initRequestQuoteItemsSlide();

    const wrapper = document.querySelector("#rm-request-products-wrapper");
    const swiper = document.querySelector("#rm-request-products .rm-slide-content").swiper;
    const slideIndex = swiper.slides.length + 1;
    const slideNameImage = data.name.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replaceAll(" ", "-");
    const productType = data.type.toLowerCase();
    const imgSrc = `../src/img/${productType}/${slideNameImage}-md.jpg`;
    const cartItems = getLocalStorage("Rolimec");

    if (cartItems) {
        const itemFounded = cartItems.find((cartItem) => data.name === cartItem.value.name);

        if (itemFounded) {
            const slideItem = document.querySelector(`input[value="${data.name}"]`).closest(".swiper-slide");
            const slideItemId = slideItem.id.split("-")[3];
            const slideItemQty = document.querySelector(`#rm-request-item-qty-${slideItemId}`);

            slideItemQty.innerText = Number(itemFounded.value.qty) + Number(data.qty);
        }

        else requestQuoteItemsContent(swiper, slideIndex, data, imgSrc);
    }

    else requestQuoteItemsContent(swiper, slideIndex, data, imgSrc);

    swiper.update();
}

/** Content for Request Quote item */
function requestQuoteItemsContent(swiper, slideIndex, data, imgSrc) {
    swiper.appendSlide(`
        <article class="swiper-slide rm-slide-article" id="rm-request-item-${slideIndex}">
            <form action="#" class="rm-slide-data">
                <input type="hidden" id="rm-request-item-name-${slideIndex}"
                    value="${data.name}">
                <input type="hidden" id="rm-request-item-type-${slideIndex}"
                    value="${data.type}">
                
                <figure>
                    <span class="badge rounded-pill" id="rm-request-item-qty-${slideIndex}">
                        ${data.qty}
                    </span>
                    <img src="${imgSrc}" alt="${data.name}">
                </figure>
                
                <button type="button" class="btn rm-request-item-remove"
                    id="rm-request-item-remove-${slideIndex}"
                    onclick="return window.removeRequestQuoteItem(this)">
                    Excluir
                </button>
            </form>
        </article>
    `);
}

/** Remove an item from Request Quote slide */
export function removeRequestQuoteItemsSlide() {
    const swiper = document.querySelector("#rm-request-products .rm-slide-content").swiper;

    swiper.removeSlide(swiper.clickedIndex);
    getRequestQuoteItemsQuantity();

    // Remove slide from page
    const requestQuoteProducts = document.querySelector("#rm-request-products");
    const cartItems = getLocalStorage("Rolimec");

    if (cartItems.length === 0) requestQuoteProducts.classList.add("d-none");

    swiper.update();
}