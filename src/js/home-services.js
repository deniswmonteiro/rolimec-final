/** Swiper */
export function initHomeServicesSlide() {
    new Swiper("#rm-home-services .rm-slide-content", {
        loop: true,
        spaceBetween: 20,
        grabCursor: true,
      
        pagination: {
            el: "#rm-home-services .swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
      
        breakpoints:{
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}