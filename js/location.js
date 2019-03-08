$(function(){
    // 手机长度适配
    const height = $('body').height()
    $('body').height(height)
    // 初始化地图
    let map = new AMap.Map('main',{
        zoom: 12,
        center: [114.083372,22.544146],
    });

    // 侧导航栏点击事件
    let side = 0
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

    // 监听输入框状态
    $('#search').on('input propertychange',function(){
        if ($(this).val().includes('某')) {
            $('.search-data').css('display','block')
        } else{
            $('.search-data').css('display','none')
        }
    })

    // 查看人员信息点击事件
    $('#examine').on('click',function(){
        $('.data-box').css('display','block')
        $('.search-data').css('display','none')
    })

    // 人员信息与历史轨迹切换
    $('#particular').on('click',function(){
        $('.data-box').css('display','block')
        $('.history-box').css('display','none')
    })
    $('#history').on('click',function(){
        $('.data-box').css('display','none')
        $('.history-box').css('display','block')
    })
})