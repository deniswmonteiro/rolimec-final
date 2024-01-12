/** Change headers size when scroll is equal or greater than 20px from the top */
export function changeHeaderSize() {
    const scrollTop = window.scrollY;
    const headerMenu = document.querySelector("#rm-header .navbar");

    if (scrollTop >= 20) headerMenu.classList.add("rm-header-slim");
    else headerMenu.classList.remove("rm-header-slim");
}

/** Toggle mobile menu  */
window.toggleMenuMobile = (el) => {
    const headerMenu = document.querySelector("#rm-header-menu");
    const btnRequestQuoteToggle = document.querySelector("#rm-request-quote-toggle");
    let active;

    headerMenu.classList.toggle("active");
    el.classList.toggle("active");
    active = headerMenu.classList.contains("active");
    event.currentTarget.setAttribute("aria-expanded", active);

    if (active) {
        document.documentElement.style.overflow = "hidden";
        document.body.scroll = "no";  // IE
        document.body.style.touchAction = "none";

        if (btnRequestQuoteToggle) {
            btnRequestQuoteToggle.classList.add("d-none");
            btnRequestQuoteToggle.style.opacity = 0;
        }
    }

    else {
        document.documentElement.style.overflow = "initial";
        document.body.scroll = "yes";  // IE
        document.body.style.touchAction = "auto";

        if (btnRequestQuoteToggle) {
            btnRequestQuoteToggle.classList.remove("d-none");
            btnRequestQuoteToggle.style.opacity = 1;
        }
    }
}