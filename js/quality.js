$(function(){
    console.log(`hello world`)
    // const height = $('body').height()
    // $('body').height(height)

    // console.log(3*0.1)

    // 初始化swiper
    const swiper = new Swiper('#swiper', {
        slidesPerView: 3,
        freeMode : true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })

    // 导航栏点击事件
    $('.nav li').on('click',function(event){
        event.stopPropagation()
        // $(this).addClass('active').siblings().removeClass('active')
        // console.log($(this).text().includes('待办'))
        if ($(this).text().includes('全部巡检')) {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list').css('display','block')
            $('.backlog').css('display','none')
            $('.sponsor').css('display','none')
            $('.inform').css('display','none')
        } else if ($(this).text().includes('待办')) {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list').css('display','none')
            $('.backlog').css('display','block')
            $('.sponsor').css('display','none')
            $('.inform').css('display','none')
        } else if ($(this).text().includes('我发起的')) {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list').css('display','none')
            $('.backlog').css('display','none')
            $('.sponsor').css('display','block')
            $('.inform').css('display','none')
        } else if ($(this).text().includes('通知')) {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list').css('display','none')
            $('.backlog').css('display','none')
            $('.sponsor').css('display','none')
            $('.inform').css('display','block')
        }
    })

    // 信息列表导航栏点击事件
    $('.list-nav span').on('click',function (event) {
        event.stopPropagation()
        // $(this).siblings()
        if ($(this).html() == '待整改') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','block')
            $('.screen-box').css('display','none')
            $('.fixed-box').css('display','block')
        } else if ($(this).html() == '筛选') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','none')
            $('.screen-box').css('display','block')
            $('.fixed-box').css('display','none')
        }
        if ($(this).html() == '待办') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','block')
        } else if ($(this).html() == '已办') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','none')
        } else if ($(this).html() == '信息') {
            $(this).addClass('active').siblings().removeClass('active')
            $('#message').css('display','block')
            $('#warning').css('display','none')
        } else if ($(this).html() == '警告') {
            $(this).addClass('active').siblings().removeClass('active')
            $('#message').css('display','none')
            $('#warning').css('display','block')
        }
        // console.log($(this).html())
    })

    // 筛选按钮点击事件
    $('.option-box li').on('click',function(event){
        event.stopPropagation()
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 分包单位点击事件
    $('.unit .option-bar').on('click',function(event){
        event.stopPropagation()
        $('.unit-box').css('display','block')
        $('.shade-box').css('display','block')
    })

    // 工区点击事件
    $('.work-area .option-bar').on('click',function(event){
        event.stopPropagation()
        $('.work-area-box').css('display','block')
        $('.shade-box').css('display','block')
    })

    // 分包单位选项栏点击事件
    $('.unit-box ul li').on('click',function(event){
        event.stopPropagation()
        $('.unit-box').css('display','none')
        $('.shade-box').css('display','none')
        $('.unit .option-bar').html(`${$(this).text()}<i></i>`)
    })

    // 工区选项栏点击事件
    $('.work-area-box ul li').on('click',function(event){
        event.stopPropagation()
        $('.work-area-box').css('display','none')
        $('.shade-box').css('display','none')
        $('.work-area .option-bar').html(`${$(this).text()}<i></i>`)
    })

})