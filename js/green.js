$(function(){
    // console.log('hello world')
    let pid = localStorage.getItem('pid')
    // console.log(pid)


    // 获取扬尘监测设备数据
    let getDustEmissionData = (sid) =>{
        $.ajax({
            type: "GET",
            url: "http://lz.hj-tec.com/dustEmission/get/DustEmissionDatas",
            data: {sid:sid},
            dataType: "json",
            success: function(data){
                // console.log(data)
                let html = $('#dustBox').html()
                html += 
                `<div class="slide-box swiper-slide">
                    <!-- 扬尘监测 -->
                    <div class="environment">
                <div class="environment-title">
                    ${data.newData[0].comments}
                </div>
                <div class="PM">
                    <div class="subPM1">
                        <p>PM2.5</p>
                        <span> ${data.newData[0].PM25}</span>
                        <i></i>
                    </div>
                    <div class="subPM2">
                        <p>PM10</p>
                        <span> ${data.newData[0].PM10}</span>
                        <i></i>
                    </div>
                </div>
                <div class="pollute"></div>
                <div class="environment-data">
                    <div class="temperature">
                        <p>气温</p>
                        <p> ${data.newData[0].Temperature}℃</p>
                    </div>
                    <div class="humidity">
                        <p>湿度</p>
                        <p> ${data.newData[0].Humidity}%</p>
                    </div>
                    <div class="wind-speed">
                        <p>风速</p>
                        <p> ${data.newData[0].WindSpeed}m/s</p>
                    </div>
                </div>
                    </div>
                    <!-- 噪音监测 -->
                    <div class="noise">
                <div class="noise-title">
                    <i class="shade"></i>
                    噪音检测
                </div>
                <div class="noise-state">
                    <p>正常</p>
                </div>
                <div class="noise-data">
                    实时数据：
                    <span> ${data.newData[0].Noise}</span>
                    dB
                </div>
                    </div>
                </div>`
                $('#dustBox').html(html)

                // 初始化环境监测滚动
                const swiper = new Swiper('#swiper',{
                    spaceBetween : 30,
                })

                // 选择设备
                $('.selech').on('click','li',function(event){
                    event.stopPropagation()
                    $('.selech').css('display','none')
                    swiper.slideTo($(this).index(), 500, false)
                })
            }
        })
    }

    // 显示选择框
    $('#dustBox').on('click','.environment-title',(event)=>{
        event.stopPropagation()
        // console.log(`选择栏出现`)
        $('.selech').css('display','block')
    })

    // 选择设备
    // $('.selech').on('click','li',function(event){
    //     event.stopPropagation()
    //     $('.selech').css('display','none')
    //     // console.log(this.id)
    //     // console.log($(`#${this.id}`).html())
    //     // $(`#${this.id}`).on('click',(event)=>{
    //     //     event.stopPropagation()
    //     //     swiper.slideTo(0, 1000, false)
    //     //     // $('.selech').css('display','none')
    //     // })
    //     swiper.slideTo(0, 1000, false)
    // })

    // 获取天气数据
    $.ajax({
        type: "GET",
        url: "http://lz.hj-tec.com/lz/get/getWeather",
        data: {pid:pid},
        dataType: "json",
        success: function(data){
            // console.log(data)
            let mydate = new Date()
            // console.log(mydate.getHours()+':'+mydate.getMinutes()+':'+mydate.getSeconds())
            let hours = mydate.getHours()
            let minutes = mydate.getMinutes()
            let seconds = mydate.getSeconds()
            // 开启计算器更新时间
            setInterval(() => {
                seconds++
                if (seconds == 60) {
                    seconds = 0
                    minutes++
                }
                if (minutes == 60) {
                    minutes = 0
                    hours++
                }
                if (hours == 24) {
                    hours = 0
                }
                let time1 = hours<10?'0'+hours:hours
                let time2 = minutes<10?'0'+minutes:minutes
                let time3 = seconds<10?'0'+seconds:seconds
                // 渲染天气预报模块
                $('#weather').html(
                    `<div class="weather-left">
                        <div class="time">
                            ${time1+':'+time2}
                        </div>
                        <div class="day">
                            ${data.data[0].week}
                        </div>
                        <div class="weather-data">
                            <i class="weather-img"></i>
                            <p>${data.data[0].wea}</p>
                            <p>${data.data[0].tem}~${data.data[0].tem2}</p>
                            <p class="weather-bg">${data.data[0].win[0]}</p>
                            <i class="line"></i>
                        </div>
                    </div>
                    <div class="weather-right">
                        <div class="weather-title">
                            ${data.city}市天气预报
                        </div>
                        <div class="weather-box">
                            <div class="weather-data">
                                <p class="day">${data.data[1].week}</p>
                                <i class="weather-img"></i>
                                <p>${data.data[1].wea}</p>
                                <p>${data.data[1].tem}~${data.data[1].tem2}</p>
                                <p class="weather-bg">${data.data[1].win[0]}</p>
                            </div>
                            <div class="weather-data">
                                <p class="day">${data.data[2].week}</p>
                                <i class="weather-img"></i>
                                <p>${data.data[2].wea}</p>
                                <p>${data.data[2].tem}~${data.data[2].tem2}</p>
                                <p class="weather-bg">${data.data[2].win[0]}</p>
                            </div>
                        </div>
                    </div>`
                )
            }, 1000)
        }
    })

    // 获取设备名称与设备编号
    $.ajax({
        type: "GET",
        url: "http://lz.hj-tec.com/dustEmission/get/getDustEmissionList",
        data: {pid:pid},
        dataType: "json",
        success: function(data) {
            // console.log(data.dustEmissionList)
            let html = ''
            for (let i = 0; i < data.dustEmissionList.length; i++) {
                html += `<li id="sid${data.dustEmissionList[data.dustEmissionList.length-1-i].id}" index="${i}">${data.dustEmissionList[data.dustEmissionList.length-1-i].comments}</li>`
                getDustEmissionData(data.dustEmissionList[data.dustEmissionList.length-1-i].id)
            }
            $('.dust-selech').html(html)
        }
    })

    // 获取智能电箱设备数据
    $.ajax({
        type: "GET",
        url: "http://lz.hj-tec.com/electricityBox/get/getElectricBoxState",
        data: {pid:pid},
        dataType: "json",
        success: function(data) {
            console.log(data)
            $('#electicBox').html(
                `<div class="slide-box swiper-slide">
                    <div class="electic" >
                        <div class="electic-title">
                            <i class="shade"></i>
                            用电管理
                        </div>
                        <div class="this-month">
                            <i></i>
                            电箱运行状态：
                            <span>${data.sb}</span>
                        </div>
                        <div class="electic-box">
                            <div class="today">
                                &nbsp;
                                <p style="font-size:.2rem">${data.kg==0?'关':'开'}</p>
                                <span>箱门开关</span>
                            </div>
                            <div class="electic-temperature">
                                ${data.envirwarm}
                                <p>℃</p>
                                <span>电箱温度</span>
                            </div>
                            <div class="electic-temperature">
                                ${data.current}
                                <p>kwh</p>
                                <span>电箱漏电</span>
                            </div>
                        </div>
                    </div>
                </div>`
            )

            // 初始化用电管理滚动
            const swiper2 = new Swiper('#swiper2',{
                spaceBetween : 30,
            })
        }
    })

})