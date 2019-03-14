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
                left: '135%'
            })
            side = 1
        } else {
            $('.side-box').animate({
                left: '-3.2rem'
            })
            $('.search').animate({
                left: '50%'
            })
            side = 0
        }
    })

    // 监听输入框状态
    $('#search').on('input propertychange',function(){
        if ($(this).val().includes('段')||$(this).val().includes('裕')||$(this).val().includes('德')) {
            $('.search-data').css('display','block')
        } else{
            $('.search-data').css('display','none')
        }
    })

    let marker
    let polygon
    // 查看人员信息点击事件
    $('#examine').on('click',function(){
        $('.data-box').css('display','block')
        $('.search-data').css('display','none')
        marker = new AMap.Marker({
            position: [114.003378,22.571492],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        })
        map.add(marker)
        polygon = new AMap.Polygon({
            path: [
                new AMap.LngLat(113.992992,22.581439),
                new AMap.LngLat(114.01033,22.582786),
                new AMap.LngLat(114.010287,22.562853),
                new AMap.LngLat(113.996898,22.563329)
            ],  
            fillColor: '#fff', // 多边形填充颜色
            fillOpacity: 0, //填充颜色透明度
            borderWeight: 1, // 线条宽度
            strokeColor: '#137ed2', // 线条颜色}
        })
        map.add(polygon)
        map.setZoomAndCenter(14, [114.003378,22.561492])
    })

    let circle1
    let circle2
    let circle3
    let circle4
    let polyline
    // 人员信息与历史轨迹切换
    $('#particular').on('click',function(){
        $('.data-box').css('display','block')
        $('.history-box').css('display','none')
        map.add(marker)
        map.remove(circle1)
        map.remove(circle2)
        map.remove(circle3)
        map.remove(circle4)
        map.remove(polyline)
    })
    $('#history').on('click',function(){
        $('.data-box').css('display','none')
        $('.history-box').css('display','block')
        circle1 = new AMap.Circle({
            center: [113.994194,22.578189],
            fillOpacity: 1, //透明度
            zIndex: 100, //层级
            radius: 10, //半径
            fillColor: '#e10505', //填充颜色
            strokeColor: '#e10505', //轮廓线颜色
        })
        circle2 = new AMap.Circle({
            center: [114.004537,22.563725],
            fillOpacity: 1, //透明度
            zIndex: 100, //层级
            radius: 10, //半径
            fillColor: '#e10505', //填充颜色
            strokeColor: '#e10505', //轮廓线颜色
        })
        circle3 = new AMap.Circle({
            center: [114.009601,22.570383],
            fillOpacity: 1, //透明度
            zIndex: 100, //层级
            radius: 10, //半径
            fillColor: '#e10505', //填充颜色
            strokeColor: '#e10505', //轮廓线颜色
        })
        circle4 = new AMap.Circle({
            center: [114.006167,22.580171],
            fillOpacity: 1, //透明度
            zIndex: 100, //层级
            radius: 10, //半径
            fillColor: '#e10505', //填充颜色
            strokeColor: '#e10505', //轮廓线颜色
        })
        polyline = new AMap.Polyline({
            path:[
                new AMap.LngLat(113.994194,22.578189),
                new AMap.LngLat(114.004537,22.563725),
                new AMap.LngLat(114.009601,22.570383),
                new AMap.LngLat(114.006167,22.580171)
            ],
            lineJoin: 'round', //折线拐点样式
            showDir: true, //移动方向
            strokeWeight: 3, //线条宽度
            strokeColor: '#3366ff', //线条颜色
        })
        map.add(circle1)
        map.add(circle2)
        map.add(circle3)
        map.add(circle4)
        map.add(polyline)
        map.remove(marker)
    })

    let temp = 1
    // 历史轨迹详细信息
    $('#historyTop').on('click',function(){
        if (temp == 1) {
            $('#historyMiddle').animate({
                height: '1.705rem'
            })
            temp = 0
        } else {
            $('#historyMiddle').animate({
                height: '0'
            })
            temp = 1
        }
    })

    let project = 1
    // 一级菜单
    $('#project').on('click',function(){
        if (project == 1) {
            $('#project').animate({
                height: '1.74rem'
            })
            project = 0
            $('.blue-v').addClass('rotate')
        } else {
            $('#project').animate({
                height: '.39rem'
            })
            $('.blue-v').removeClass('rotate')
            project = 1
        }
    })

    let subProject = 1
    // 二级菜单
    $('#subProject').on('click',function(event){
        event.stopPropagation();
        if (subProject == 1) {
            $('#subProject').animate({
                height: '1.4rem'
            })
            $('.black-v').addClass('rotate')
            subProject = 0
        } else {
            $('#subProject').animate({
                height: '.35rem'
            })
            $('.black-v').removeClass('rotate')
            subProject = 1
        }
    })
})