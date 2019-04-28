$(function(){
    let pid = localStorage.getItem('pid')
    // console.log(`hello world`)
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
            $('.review-list').css('display','none')
            $('.accomplish-list').css('display','none')
        } else if ($(this).html() == '筛选') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','none')
            $('.screen-box').css('display','block')
            $('.fixed-box').css('display','none')
            $('.review-list').css('display','none')
            $('.accomplish-list').css('display','none')
        } else if ($(this).html() == '待复查') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','none')
            $('.screen-box').css('display','none')
            $('.fixed-box').css('display','block')
            $('.review-list').css('display','block')
            $('.accomplish-list').css('display','none')
        } else if ($(this).html() == '已完成') {
            $(this).addClass('active').siblings().removeClass('active')
            $('.list-centent').css('display','none')
            $('.screen-box').css('display','none')
            $('.fixed-box').css('display','block')
            $('.review-list').css('display','none')
            $('.accomplish-list').css('display','block')
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

    // 获取待整改整改单列表
    function rectifyQueryPolling () {
        axios.post(`http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=${pid}&type=0`).then(
            res => {
                console.log(res.data)
                let html = ''
                for (let i = 0; i < res.data.msg.length; i++) {
                    // console.log(res.data.msg[i])
                    html += 
                        `<li>
                            <a href="./qualityParticulars.html?pollingId=${res.data.msg[res.data.msg.length-1-i].pollingId}&type=0&pollingDetailId=${res.data.msg[res.data.msg.length-1-i].pollingDetailId}">
                                <div class="title">
                                    <div class="title-name">
                                        ${res.data.msg[res.data.msg.length-1-i].describex}
                                    </div>
                                    <div class="title-state" style="color:rgb(233, 162, 47)">
                                        待整改
                                    </div>
                                </div>
                                <div class="middle">
                                    <div>
                                        <span class="name">检查区域</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].place}</span>
                                    </div>
                                    <div>
                                        <span class="name">整改要求</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].rectification}</span>
                                    </div>
                                    <div>
                                        <span class="name">检查人</span>
                                        <span class="message">某某某</span>
                                    </div>
                                    <div>
                                        <span class="name">整改时限</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].deadlineTime}</span>
                                    </div>
                                    <div class="img-box" style="background-image:url(${res.data.msg[res.data.msg.length-1-i].fileUrl})"></div>
                                    <div class="bottom">
                                        <span class="${res.data.msg[res.data.msg.length-1-i].rank==1?'slight':res.data.msg[res.data.msg.length-1-i].rank==2?'ordinary':'severity'}"></span>
                                        <span class="name">整改人</span>
                                        <span class="message">某某某</span>
                                        <div class="time">${res.data.msg[res.data.msg.length-1-i].createTime}</div>
                                    </div>
                                </div>
                            </a>
                        </li>`
                }
                $('.list-centent ul').html(html)
            }
        )
    }

    // 获取待审核整改单列表
    function auditQueryPolling () {
        axios.post(`http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=${pid}&type=1`).then(
            res => {
                console.log(res.data)
                let html = ''
                for (let i = 0; i < res.data.msg.length; i++) {
                    // console.log(res.data.msg[i])
                    html += 
                        `<li>
                            <a href="./qualityParticulars.html?pollingId=${res.data.msg[res.data.msg.length-1-i].pollingId}&type=1&pollingDetailId=${res.data.msg[res.data.msg.length-1-i].pollingDetailId}">
                                <div class="title">
                                    <div class="title-name">
                                        ${res.data.msg[res.data.msg.length-1-i].describex}
                                    </div>
                                    <div class="title-state" style="color:rgb(233, 162, 47)">
                                        待复查
                                    </div>
                                </div>
                                <div class="middle">
                                    <div>
                                        <span class="name">检查区域</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].place}</span>
                                    </div>
                                    <div>
                                        <span class="name">整改要求</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].rectification}</span>
                                    </div>
                                    <div>
                                        <span class="name">检查人</span>
                                        <span class="message">某某某</span>
                                    </div>
                                    <div>
                                        <span class="name">整改时限</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].deadlineTime}</span>
                                    </div>
                                    <div class="img-box" style="background-image:url(${res.data.msg[res.data.msg.length-1-i].fileUrl})"></div>
                                    <div class="bottom">
                                        <span class="${res.data.msg[res.data.msg.length-1-i].rank==1?'slight':res.data.msg[res.data.msg.length-1-i].rank==2?'ordinary':res.data.msg[res.data.msg.length-1-i].rank==3?'severity':''}"></span>
                                        <span class="name">整改人</span>
                                        <span class="message">某某某</span>
                                        <div class="time">${res.data.msg[res.data.msg.length-1-i].createTime}</div>
                                    </div>
                                </div>
                            </a>
                        </li>`
                }
                $('.review-list ul').html(html)
            }
        )
    }

    // 获取已完成的整改单列表
    function accomplishQueryPolling () {
        axios.post(`http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=${pid}&type=2`).then(
            res => {
                console.log(res.data)
                let html = ''
                for (let i = 0; i < res.data.msg.length; i++) {
                    // console.log(res.data.msg[i])
                    html += 
                        `<li>
                            <a href="./qualityParticulars.html?pollingId=${res.data.msg[res.data.msg.length-1-i].pollingId}&type=2&pollingDetailId=${res.data.msg[res.data.msg.length-1-i].pollingDetailId}">
                                <div class="title">
                                    <div class="title-name">
                                        ${res.data.msg[res.data.msg.length-1-i].describex}
                                    </div>
                                    <div class="title-state" style="color:#4cd964">
                                        已完成
                                    </div>
                                </div>
                                <div class="middle">
                                    <div>
                                        <span class="name">检查区域</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].place}</span>
                                    </div>
                                    <div>
                                        <span class="name">整改要求</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].rectification}</span>
                                    </div>
                                    <div>
                                        <span class="name">检查人</span>
                                        <span class="message">某某某</span>
                                    </div>
                                    <div>
                                        <span class="name">整改时限</span>
                                        <span class="message">${res.data.msg[res.data.msg.length-1-i].deadlineTime}</span>
                                    </div>
                                    <div class="img-box" style="background-image:url(${res.data.msg[res.data.msg.length-1-i].fileUrl})"></div>
                                    <div class="bottom">
                                        <span class="${res.data.msg[res.data.msg.length-1-i].rank==1?'slight':res.data.msg[res.data.msg.length-1-i].rank==2?'ordinary':res.data.msg[res.data.msg.length-1-i].rank==3?'severity':''}"></span>
                                        <span class="name">整改人</span>
                                        <span class="message">某某某</span>
                                        <div class="time">${res.data.msg[res.data.msg.length-1-i].createTime}</div>
                                    </div>
                                </div>
                            </a>
                        </li>`
                }
                $('.accomplish-list ul').html(html)
            }
        )
    }

    accomplishQueryPolling()
    rectifyQueryPolling()
    auditQueryPolling()
})