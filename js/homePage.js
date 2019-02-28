$(function(){
    // FastClick.attach(document.body)
    // console.log('hello world')
    // 初始化swiper
    const swiper1 = new Swiper('#swiper1', {
        loop : true,
        autoplay:true,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    const swiper2 = new Swiper('#swiper2', {
        slidesPerView: 4,
        freeMode : true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
})