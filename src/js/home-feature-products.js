/** Swiper */
export function initHomeFeaturedProductsSlide() {
    new Swiper("#rm-home-featured-products .rm-slide-content", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
      
        pagination: {
            el: "#rm-home-featured-products .swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
    });
}

/** Animate Feeatured Products background */
export function scrollRotate() {
    if (window.matchMedia("(min-width: 1300px)").matches) {
        const featuredProducts = document.querySelector("#rm-home-featured-products");

        if (featuredProducts) {
            const headerHeight = document.querySelector("#rm-header").clientHeight;

            const sectionHeight = featuredProducts.clientHeight;
            const sectionOffsetTop = featuredProducts.offsetTop;
            const scrollTop = window.scrollY;
            const scrollTopAnimateSection = scrollTop + (window.innerHeight * .5);

            if ((sectionOffsetTop - headerHeight) < scrollTopAnimateSection && ((sectionOffsetTop - headerHeight + sectionHeight)) > scrollTopAnimateSection) {
                featuredProducts.style.setProperty("--rmHomeFeaturedProductsBefore", `rotate(${scrollTop/2}deg)`);
            }
        }
    }
}