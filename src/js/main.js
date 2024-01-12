import { changeHeaderSize } from  "./header.js";
import { changeAlertTop, getRequestQuoteItems, getRequestQuoteItemsQuantity } from "./general.js";
import { initHomeServicesSlide } from "./home-services.js";
import { initHomeFeaturedProductsSlide, scrollRotate } from "./home-feature-products.js";
import { initHomePartnersSlide } from "./home-partners.js";
import { getProductCatalog } from "./products.js";
import { initCompanySlide } from "./company.js";
import { getFullYear } from "./footer.js";

window.onload = () => {
    /** Header */
    changeHeaderSize();
    window.addEventListener("scroll", changeHeaderSize);

    /** Alert */
    changeAlertTop();
    window.addEventListener("scroll", changeAlertTop);

    /** Get Request Quote items quantity */
    getRequestQuoteItemsQuantity();

    /** Get Request Items */
    getRequestQuoteItems();

    /** Home Services */
    initHomeServicesSlide();

    /** Home Featured Products */
    initHomeFeaturedProductsSlide();
    window.addEventListener("scroll", scrollRotate);

    /** Home Partners */
    initHomePartnersSlide();

    getProductCatalog();

    /** Company */
    initCompanySlide();

    /** Footer */
    getFullYear();
}