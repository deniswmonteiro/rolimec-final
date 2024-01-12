/** Swiper */
export function initCompanySlide() {
    const swiper = new Swiper("#rm-company .rm-swiper-2", {
        spaceBetween: 20,
    });

    new Swiper("#rm-company .rm-swiper-1", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,

        thumbs: {
            swiper: swiper,
        },

        pagination: {
            el: "#rm-company .swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
    });
}