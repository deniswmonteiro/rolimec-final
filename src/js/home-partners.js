/** Swiper */
export function initHomePartnersSlide() {
    new Swiper("#rm-home-partners .rm-slide-content", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        grabCursor: true,

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
      
        pagination: {
            el: "#rm-home-partners .swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
      
        breakpoints:{
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });
}