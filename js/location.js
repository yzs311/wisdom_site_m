$(function(){
    let pid = localStorage.getItem('pid')

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
        // console.log($(this).val())
        let value = $(this).val()
        $.ajax({
            type: "GET",
            url: "http://39.108.103.150:8989/lz/hire/localtionList",
            data: {id:pid,string:value},
            dataType: "json",
            success: function (data) {
                console.log(data)
                let html = ''
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        html += 
                        `<li data-name=${data[i].hname}>
                            <div class="left-img"></div>
                            <div class="content">
                                <div class="name">
                                    姓名：${data[i].hname}
                                </div>
                                <div class="company">
                                    所属公司：${data[i].laowu}
                                </div>
                                <div class="location">
                                    所属工区：${data[i].areaList[0].name}
                                </div>
                            </div>
                            <div class="right-img"></div>
                        </li>`
                    }
                    $('#searchList').html(html)
                    $('.search-data').css('display','block')
                } else {
                    $('#searchList').html(
                        `<li style="border-bottom:none">
                            <div class="content" style="line-height:.7rem; text-align:center; font-size:.16rem">
                                无相关人员
                            </div>
                        </li>`
                    )
                    $('.search-data').css('display','block')
                }
            }
        })
        if (value == '') {
            $('.search-data').css('display','none')
        }
    })

    let marker   // 当前位置
    let circle   // 电子围栏
    let polyline // 历史轨迹
    // 查看人员信息点击事件
    $('#searchList').on('click','li',function(){
        // console.log($(this).data('name'))
        let name = $(this).data('name')
        $('.history-box').css('display','none')
        $.ajax({
            type: "GET",
            url: "http://39.108.103.150:8989/lz/hire/localtionList",
            data: {id:pid,string:name},
            dataType: "json",
            // async: false,
            success: function (data) {
                console.log(data)
                if (data[0].localtionList){
                    let temp = []
                    let temp2 = []
                    temp.push(data[0].areaList[0].xloc)
                    temp.push(data[0].areaList[0].yloc)
                    temp2.push(data[0].localtionList[0].xloc)
                    temp2.push(data[0].localtionList[0].yloc)
                    $('.data-box').css('display','block')
                    $('.search-data').css('display','none')
                    marker = new AMap.Marker({
                        position: temp2,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    })
                    map.add(marker)
                    circle = new AMap.Circle({
                        center: temp, // 圆心位置
                        radius: data[0].areaList[0].radius,         // 圆半径
                        fillColor: 'none',   // 圆形填充颜色
                        fillOpacity: 0,      // 填充色透明度
                        strokeColor: '#3979fe', // 描边颜色
                        strokeWeight: 2,     // 描边宽度
                    })
                    map.add(circle)
                    map.setZoomAndCenter(13, temp)
                    $('#dataBox').html(
                        `<div class="top-box">
                            <div class="list-box">
                                <ul>
                                    <li class="name">
                                        姓名：${data[0].hname}
                                    </li>
                                    <li>
                                        电话：${data[0].phone}
                                    </li>
                                    <li>
                                        所属公司：${data[0].laowu}
                                    </li>
                                    <li>
                                        设备编号：${data[0].imei}
                                    </li>
                                    <li>
                                        定位时间：${data[0].localtionList[0].createDate}
                                    </li>
                                    <li>
                                        定位地址：${data[0].localtionList[0].address}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="bottom-box">
                            <div class="electric">
                                电量：${data[0].localtionList[0].bat}%
                            </div>
                            <div class="refresh">
                                刷新定位
                            </div>
                            <div class="switchover" id="history" >
                                历史轨迹
                            </div>
                        </div>`
                    )
                    let calendar = new datePicker();
                    calendar.init({
                        'trigger': '#history', /*按钮选择器，用于触发弹出插件*/
                        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                        'minDate':'1900-1-1',/*最小日期*/
                        'maxDate':'2100-12-31',/*最大日期*/
                        'onSubmit':function(){/*确认时触发事件*/
                            let theSelectData=calendar.value;
                            // console.log(name)
                            $.ajax({
                                type: "GET",
                                url: "http://39.108.103.150:8989/lz/hire/localtionList",
                                data: {id:pid,string:name,createDate:theSelectData},
                                dataType: "json",
                                success: function (data) {
                                    // console.log(data)
                                    $('.data-box').css('display','none')
                                    $('.history-box').css('display','block')
                                    let temp = []
                                    let temp2 = []
                                    let temp3 = []
                                    temp.push(data[0].areaList[0].xloc)
                                    temp.push(data[0].areaList[0].yloc)
                                    for (let i = 0; i < data[0].localtionList.length; i++) {
                                        temp2 = []
                                        temp2.push(data[0].localtionList[data[0].localtionList.length-1-i].xloc)
                                        temp2.push(data[0].localtionList[data[0].localtionList.length-1-i].yloc)
                                        temp3.push(temp2)
                                    }
                                    polyline = new AMap.Polyline({
                                        path: temp3,
                                        lineJoin: 'round', //折线拐点样式
                                        showDir: true, //移动方向
                                        strokeWeight: 3, //线条宽度
                                        strokeColor: '#3366ff', //线条颜色
                                    })
                                    map.add(polyline)
                                    map.remove(marker)
                                    map.setZoomAndCenter(13, temp)

                                    $('#historyBox').html(
                                        `<div class="top-box" id="historyTop">
                                            <div class="pull-up"></div>
                                            <div class="list-box">
                                                <ul>
                                                    <li class="name">
                                                        姓名：${data[0].hname}
                                                    </li>
                                                    <li>
                                                        电话：${data[0].phone}
                                                    </li>
                                                    <li>
                                                        所属公司：${data[0].laowu}
                                                    </li>
                                                    <li>
                                                        设备编号：${data[0].imei}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="middle-box" id="historyMiddle">
                                            <div class="enter">
                                                <div class="img-box"></div>
                                                <ul>
                                                    <li>
                                                        设备电量：${data[0].localtionList[0].bat}%
                                                    </li>
                                                    <li>
                                                        时间：${data[0].localtionList[0].createDate}
                                                        <br>

                                                    </li>
                                                    <li>
                                                        位置：${data[0].localtionList[0].address}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="come">
                                                <div class="img-box"></div>
                                                <ul>
                                                    <li>
                                                        设备电量：${data[0].localtionList[data[0].localtionList.length-1].bat}%
                                                    </li>
                                                    <li>
                                                        时间：${data[0].localtionList[data[0].localtionList.length-1].createDate}
                                                        <br>

                                                    </li>
                                                    <li>
                                                        位置：${data[0].localtionList[data[0].localtionList.length-1].address}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="bottom-box">
                                            <div class="electric">
                                                电量：${data[0].localtionList[0].bat}%
                                            </div>
                                            <div class="refresh">
                                                刷新定位
                                            </div>
                                            <div class="switchover" id="particular">
                                                个人详情
                                            </div>
                                        </div>`
                                    )
                                }
                            })
                        },
                        'onClose':function(){/*取消时触发事件*/
                            // console.log(`123`)
                        }
                    })
                } else {
                    alert('此设备已关机！')
                }
            }
        })
    })

    // 人员信息与历史轨迹切换
    $('#historyBox').on('click','#particular',function(){
        $('.data-box').css('display','block')
        $('.history-box').css('display','none')
        map.add(marker)
        map.remove(polyline)
    })

    let temp = 1
    // 历史轨迹详细信息
    $('#historyBox').on('click','#historyTop',function(){
        // console.log(`123`)
        if (temp == 1) {
            $('#historyMiddle').animate({
                height: '1.705rem'
            })
            $('.pull-up').css('transform','rotate(180deg)')
            temp = 0
        } else {
            $('#historyMiddle').animate({
                height: '0'
            })
            $('.pull-up').css('transform','rotate(0deg)')
            temp = 1
        }
    })
        
    // 获取工区数据
    $.ajax({
        type: "GET",
        url: "http://39.108.103.150:8989/lz/project/listzh",
        data: {id:pid},
        dataType: "json",
        success: function(data) {
            // console.log(data)
            $('#sideBox').html(
                `<div class="project" id="project">
                    ${data.title}
                    <i class="blue-v"></i>
                </div>`
            )
            let projectHtml =  $('#project').html()
            for (let i = 0; i < data.areaList.length; i++) {
                // console.log(projectHtml)
                projectHtml += 
                `<div class="sub-project" id="subProject${i}">
                    ${data.areaList[i].name}
                    <i class="black-v"></i>
                    <div class="name-box">
                        
                    </div>
                </div>`
            }
            $('#project').html(projectHtml)

            let subProjectHeight1 = $(`#subProject0`).height()
            let nameHeight1 = $(`#subProject0 .name-box`).height()
            // console.log(subProjectHeight1)
            let subProjectHeight2 = 0
            let nameHeight2 = 0
            for (let i = 0; i < data.areaList.length; i++) {
                let tempHtml = ''
                for (let j = 0; j < data.areaList[i].hireList.length; j++) {
                    tempHtml += 
                    `<div class="name" data-name=${data.areaList[i].hireList[j].hname}>
                        <span>${data.areaList[i].hireList[j].hname}</span>
                        <span class=${data.areaList[i].hireList[j].xloc!=null?'online':'offline'}>${data.areaList[i].hireList[j].xloc!=null?'在线':'不在线'}</span>
                    </div>`
                }
                $(`#subProject${i} .name-box`).html(tempHtml)
                // console.log( $(`#subProject${i} .name-box`).html())

                subProjectHeight2 += $(`#subProject${i}`).height()
                // console.log(subProjectHeight2)
                nameHeight2 += $(`#subProject${i} .name-box`).height()
                let projectHeight = $('#project').height()
                let project = 1
                let subProject = 1
                // 一级菜单
                $('#project').on('click',function(event){
                    // console.log($('#subProject').height())
                    event.stopPropagation()
                    if (project == 1) {
                        $('#project').animate({
                            height: (projectHeight+subProjectHeight2+nameHeight2)+'px'
                        })
                        project = 0
                        $('.blue-v').addClass('rotate')
                    } else {
                        $('#project').animate({
                            height: projectHeight+'px'
                        })
                        $('.blue-v').removeClass('rotate')
                        project = 1
                    }
                })
            
                // 二级菜单
                $(`#subProject${i}`).on('click',function(event){
                    // 阻止事件冒泡
                    event.stopPropagation()
                    // console.log(subProjectHeight2)        
                    if (subProject == 1) {
                        $(`#subProject${i}`).animate({
                            height: (subProjectHeight2+nameHeight2)+'px'
                        })
                        $(`#subProject${i} .black-v`).addClass('rotate')
                        subProject = 0
                    } else {
                        $(`#subProject${i}`).animate({
                            height: subProjectHeight1+'px'
                        })
                        $(`#subProject${i} .black-v`).removeClass('rotate')
                        subProject = 1
                    }
                })

                // 人员点击事件
                $('.name').on('click',function (event) {
                    event.stopPropagation()
                    // console.log($(this).data('name'))
                    let name = $(this).data('name')
                    $('.history-box').css('display','none')
                    $.ajax({
                        type: "GET",
                        url: "http://39.108.103.150:8989/lz/hire/localtionList",
                        data: {id:pid,string:name},
                        dataType: "json",
                        // async: false,
                        success: function (data) {
                            // console.log(data)
                            if (data[0].localtionList){
                                $('.side-box').animate({
                                    left: '-3.2rem'
                                })
                                $('.search').animate({
                                    left: '50%'
                                })
                                side = 0
                                let temp = []
                                let temp2 = []
                                temp.push(data[0].areaList[0].xloc)
                                temp.push(data[0].areaList[0].yloc)
                                temp2.push(data[0].localtionList[0].xloc)
                                temp2.push(data[0].localtionList[0].yloc)
                                $('.data-box').css('display','block')
                                $('.search-data').css('display','none')
                                marker = new AMap.Marker({
                                    position: temp2,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                })
                                map.add(marker)
                                circle = new AMap.Circle({
                                    center: temp, // 圆心位置
                                    radius: data[0].areaList[0].radius,         // 圆半径
                                    fillColor: 'none',   // 圆形填充颜色
                                    fillOpacity: 0,      // 填充色透明度
                                    strokeColor: '#3979fe', // 描边颜色
                                    strokeWeight: 2,     // 描边宽度
                                })
                                map.add(circle)
                                map.setZoomAndCenter(13, temp)
                                $('#dataBox').html(
                                    `<div class="top-box">
                                        <div class="list-box">
                                            <ul>
                                                <li class="name">
                                                    姓名：${data[0].hname}
                                                </li>
                                                <li>
                                                    电话：${data[0].phone}
                                                </li>
                                                <li>
                                                    所属公司：${data[0].laowu}
                                                </li>
                                                <li>
                                                    设备编号：${data[0].imei}
                                                </li>
                                                <li>
                                                    定位时间：${data[0].localtionList[0].createDate}
                                                </li>
                                                <li>
                                                    定位地址：${data[0].localtionList[0].address}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="bottom-box">
                                        <div class="electric">
                                            电量：${data[0].localtionList[0].bat}%
                                        </div>
                                        <div class="refresh">
                                            刷新定位
                                        </div>
                                        <div class="switchover" id="history" >
                                            历史轨迹
                                        </div>
                                    </div>`
                                )
                                let calendar = new datePicker();
                                calendar.init({
                                    'trigger': '#history', /*按钮选择器，用于触发弹出插件*/
                                    'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                                    'minDate':'1900-1-1',/*最小日期*/
                                    'maxDate':'2100-12-31',/*最大日期*/
                                    'onSubmit':function(){/*确认时触发事件*/
                                        let theSelectData=calendar.value;
                                        // console.log(name)
                                        $.ajax({
                                            type: "GET",
                                            url: "http://39.108.103.150:8989/lz/hire/localtionList",
                                            data: {id:pid,string:name,createDate:theSelectData},
                                            dataType: "json",
                                            success: function (data) {
                                                // console.log(data)
                                                $('.data-box').css('display','none')
                                                $('.history-box').css('display','block')
                                                let temp = []
                                                let temp2 = []
                                                let temp3 = []
                                                temp.push(data[0].areaList[0].xloc)
                                                temp.push(data[0].areaList[0].yloc)
                                                for (let i = 0; i < data[0].localtionList.length; i++) {
                                                    temp2 = []
                                                    temp2.push(data[0].localtionList[data[0].localtionList.length-1-i].xloc)
                                                    temp2.push(data[0].localtionList[data[0].localtionList.length-1-i].yloc)
                                                    temp3.push(temp2)
                                                }
                                                polyline = new AMap.Polyline({
                                                    path: temp3,
                                                    lineJoin: 'round', //折线拐点样式
                                                    showDir: true, //移动方向
                                                    strokeWeight: 3, //线条宽度
                                                    strokeColor: '#3366ff', //线条颜色
                                                })
                                                map.add(polyline)
                                                map.remove(marker)
                                                map.setZoomAndCenter(13, temp)
                                            
                                                $('#historyBox').html(
                                                    `<div class="top-box" id="historyTop">
                                                        <div class="pull-up"></div>
                                                        <div class="list-box">
                                                            <ul>
                                                                <li class="name">
                                                                    姓名：${data[0].hname}
                                                                </li>
                                                                <li>
                                                                    电话：${data[0].phone}
                                                                </li>
                                                                <li>
                                                                    所属公司：${data[0].laowu}
                                                                </li>
                                                                <li>
                                                                    设备编号：${data[0].imei}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="middle-box" id="historyMiddle">
                                                        <div class="enter">
                                                            <div class="img-box"></div>
                                                            <ul>
                                                                <li>
                                                                    设备电量：${data[0].localtionList[0].bat}%
                                                                </li>
                                                                <li>
                                                                    时间：${data[0].localtionList[0].createDate}
                                                                    <br>
                                                
                                                                </li>
                                                                <li>
                                                                    位置：${data[0].localtionList[0].address}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="come">
                                                            <div class="img-box"></div>
                                                            <ul>
                                                                <li>
                                                                    设备电量：${data[0].localtionList[data[0].localtionList.length-1].bat}%
                                                                </li>
                                                                <li>
                                                                    时间：${data[0].localtionList[data[0].localtionList.length-1].createDate}
                                                                    <br>
                                                
                                                                </li>
                                                                <li>
                                                                    位置：${data[0].localtionList[data[0].localtionList.length-1].address}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="bottom-box">
                                                        <div class="electric">
                                                            电量：${data[0].localtionList[0].bat}%
                                                        </div>
                                                        <div class="refresh">
                                                            刷新定位
                                                        </div>
                                                        <div class="switchover" id="particular">
                                                            个人详情
                                                        </div>
                                                    </div>`
                                                )
                                            }
                                        })
                                    },
                                    'onClose':function(){/*取消时触发事件*/
                                        // console.log(`123`)
                                    }
                                })
                            } else {
                                alert('此设备已关机！')
                            }
                        }
                    })
                })
            }
        }
    })

})