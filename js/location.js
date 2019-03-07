$(function(){
    // 手机长度适配
    const height = $('body').height()
    $('body').height(height)
    // 初始化地图
    let map = new AMap.Map('main',{
        zoom: 12,
        center: [114.083372,22.544146],
    });

    let side = 0
    // 侧导航栏点击事件
    $('.nav').on('click',function(){
        if (side == 0) {
            $('.side-box').animate({
                left: '0'
            })
            $('.search').animate({
                left: '108%'
            })
            side = 1
        } else {
            $('.side-box').animate({
                left: '-2.15rem'
            })
            $('.search').animate({
                left: '50%'
            })
            side = 0
        }
    })
})