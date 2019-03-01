$(function(){
    // 初始化导航栏滚动
    const swiper1 = new Swiper('#swiper1', {
        slidesPerView: 3,
        freeMode : true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
    // 初始化设备信息滚动
    const swiper2 = new Swiper('#swiper2')
    // const swiper3 = new Swiper('#swiper3')
    // 模块切换点击事件
    // 切换到塔吊模块
    $('#towerCraneBtn').on('click',()=>{
        $('.towerCrane').css('display','')
        let siblings = $('.towerCrane').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
    })
    // 切换到升降机模块
    $('#elevatorBtn').on('click',()=>{
        $('.elevator').css('display','')
        let siblings = $('.elevator').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
        const swiper3 = new Swiper('#swiper3')
    })
})