var swiper = new Swiper('.swiper-container-lovexhj1', {
    pagination: '.swiper-pagination-lovexhj1',
    paginationClickable: true,
    spaceBetween: 30,
});

var swiper = new Swiper('.swiper-container-lovexhj2', {
    pagination: '.swiper-pagination-lovexhj2',
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    }
});

var swiper = new Swiper('.swiper-container-lovexhj3', {
    pagination: '.swiper-pagination-lovexhj3',
    effect: 'flip',
    grabCursor: true,
    nextButton: '.swiper-button-next-lovexhj3',
    prevButton: '.swiper-button-prev-lovexhj3'
});