$(function(){
    // console.log('hello world')
    let pid = localStorage.getItem('pid')

    // 获取合同签订数据
    $.ajax({
        type: "GET",
        url: "http://39.108.103.150:8989/lz/get/getDataCount",
        data: {pid:pid},
        dataType: "json",
        success: function(data){
            // console.log(data)

            // 渲染进场手续签订模块
            $('#entrance').html(
                `<div class="left-box">
                    <i class="shade"></i>
                    <div class="box-title">
                        进场手续签订签订
                    </div>
                    <div class="box-data">
                        <ul>
                            <li>共录入：${data.entrance.total}人</li>
                            <li>共签订：${data.entrance.ht}人</li>
                            <li>未签订：${data.entrance.wq}人</li>
                            <li>是否合格：<span class="${data.entrance.bfb==100?'green-color':'red-color'}">${data.entrance.hg}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="right-box ${data.entrance.bfb==100?'green-bg':'red-bg'}">
                    <div class="border ${data.entrance.bfb==100?'green-color':'red-color'}"></div>
                    <div class="subBorder ${data.entrance.bfb==100?'green-color':'red-color'}">
                        <div class="wrapper" style="right:0">
                            <div class="circleProgress ${data.entrance.bfb==100?'rightcircle-green':'rightcircle-red'}"></div>
                        </div>
                        <div class="wrapper" style="left:0">
                            <div class="circleProgress ${data.entrance.bfb==100?'leftcircle-green':'leftcircle-red'}"></div>
                        </div>
                    </div>
                    <span class="${data.entrance.bfb==100?'green-color':'red-color'}">${Math.floor(data.entrance.bfb)}%</span>
                </div>`
            )

            // 渲染退场手续模块
            $('#exit_pdf').html(
                `<div class="left-box">
                   <i class="shade"></i>
                   <div class="box-title">
                       退场手续签订
                   </div>
                   <div class="box-data">
                       <ul>
                           <li>共录入：${data.exit_pdf.total}人</li>
                           <li>共签订：${data.exit_pdf.ht}人</li>
                           <li>未签订：${data.exit_pdf.wq}人</li>
                           <li>是否合规：<span class="${data.exit_pdf.bfb==100?'green-color':'red-color'}">${data.exit_pdf.hg}</span></li>
                       </ul>
                   </div>
                </div>
                <div class="right-box ${data.exit_pdf.bfb==100?'green-bg':'red-bg'}">
                   <div class="border ${data.exit_pdf.bfb==100?'green-color':'red-color'}"></div>
                   <div class="subBorder ${data.exit_pdf.bfb==100?'green-color':'red-color'}">
                       <div class="wrapper" style="right:0">
                           <div class="circleProgress ${data.exit_pdf.bfb==100?'rightcircle-green':'rightcircle-red'}"></div>
                       </div>
                       <div class="wrapper" style="left:0">
                           <div class="circleProgress ${data.exit_pdf.bfb==100?'leftcircle-green':'leftcircle-red'}"></div>
                       </div>
                   </div>
                   <span class="${data.exit_pdf.bfb==100?'green-color':'red-color'}">${Math.floor(data.exit_pdf.bfb)}%</span>
                </div>`
            )

            // 渲染劳动合同签订模块
            $('#contract').html(
                `<div class="left-box">
                    <i class="shade"></i>
                    <div class="box-title">
                        劳动合同签订
                    </div>
                    <div class="box-data">
                        <ul>
                            <li>共录入：${data.contract.total}人</li>
                            <li>共签订：${data.contract.ht}人</li>
                            <li>未签订：${data.contract.wq}人</li>
                            <li>是否合规：<span class="${data.contract.bfb==100?'green-color':'red-color'}">${data.contract.hg}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="right-box ${data.contract.bfb==100?'green-bg':'red-bg'}">
                    <div class="border ${data.contract.bfb==100?'green-color':'red-color'}"></div>
                    <div class="subBorder ${data.contract.bfb==100?'green-color':'red-color'}">
                        <div class="wrapper" style="right:0">
                            <div class="circleProgress ${data.contract.bfb==100?'rightcircle-green':'rightcircle-red'}"></div>
                        </div>
                        <div class="wrapper" style="left:0">
                            <div class="circleProgress ${data.contract.bfb==100?'leftcircle-green':'leftcircle-red'}"></div>
                        </div>
                    </div>
                    <span class="${data.contract.bfb==100?'green-color':'red-color'}">${Math.floor(data.contract.bfb)}%</span>
                </div>`
            )

            // 两制确认书签订模块
            $('#workConfirm').html(
                `<div class="left-box">
                    <i class="shade"></i>
                    <div class="box-title">
                        两制确认书签订
                    </div>
                    <div class="box-data">
                        <ul>
                            <li>共录入：${data.workConfirm.total}人</li>
                            <li>共签订：${data.workConfirm.ht}人</li>
                            <li>未签订：${data.workConfirm.wq}人</li>
                            <li>是否合规：<span class="${data.workConfirm.bfb==100?'green-color':'red-color'}">${data.workConfirm.hg}</span></li>
                        </ul>
                    </div>
                </div>
                <div class="right-box ${data.workConfirm.bfb==100?'green-bg':'red-bg'}">
                    <div class="border ${data.workConfirm.bfb==100?'green-color':'red-color'}"></div>
                    <div class="subBorder ${data.workConfirm.bfb==100?'green-color':'red-color'}">
                        <div class="wrapper" style="right:0">
                            <div class="circleProgress ${data.workConfirm.bfb==100?'rightcircle-green':'rightcircle-red'}"></div>
                        </div>
                        <div class="wrapper" style="left:0">
                            <div class="circleProgress ${data.workConfirm.bfb==100?'leftcircle-green':'leftcircle-red'}"></div>
                        </div>
                    </div>
                    <span class="${data.workConfirm.bfb==100?'green-color':'red-color'}">${Math.floor(data.workConfirm.bfb)}%</span>
                </div>`
            )
        }
    })

    // 获取工人出勤模块
    $.ajax({
        type: "get",
        url: "http://39.108.103.150:8989/lz/get/getKQCount",
        data: {pid:pid},
        dataType: "json",
        success: function(data){
            console.log(data)
            // 工人出勤模块渲染
            $('.attendance-rate').html(
                `<div class="attendance-title">
                    <i class="shade"></i>
                    工人出勤情况
                </div>
                <div class="schedule">
                    <div class="sub-schedule" style="width:${data.bfb}%">
                        <p>${Math.floor(data.bfb)}%</p>
                    </div>
                </div>
                <div class="content-box">
                    <div class="online">
                        <div class="content-top">
                            项目在场人数
                        </div>
                        <div class="content-bottom">
                            ${data.sum}
                        </div>
                        <i class="rise"></i>
                    </div>
                    <div class="real-time">
                        <div class="content-top">
                            今日考勤总人数
                        </div>
                        <div class="content-bottom">
                            ${data.kq}
                        </div>
                        <i class="rise"></i>
                    </div>
                    <div class="worker">
                        <div class="content-top">
                            今日工人出勤人数
                        </div>
                        <div class="content-bottom">
                            ${data.workerCheck}
                        </div>
                        <i class="rise"></i>
                    </div>
                    <div class="administrator">
                        <div class="content-top">
                            今日管理出勤人数
                        </div>
                        <div class="content-bottom">
                            ${data.managerCheck}
                        </div>
                        <i class="rise"></i>
                    </div>
                </div>`
            )
        }
    })
})