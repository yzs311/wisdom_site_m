$(function(){
    // 获取项目id
    let pid = localStorage.getItem('pid')

    // 初始化导航栏滚动
    const swiper1 = new Swiper('#swiper1', {
        slidesPerView: 3,
        freeMode : true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
    
    // const swiper3 = new Swiper('#swiper3')
    
    // 模块切换点击事件
    // 切换到塔吊模块
    $('#towerCraneBtn').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        event.stopPropagation()
        $('.towerCrane').css('display','')
        let siblings = $('.towerCrane').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
    })

    // 切换到升降机模块
    $('#elevatorBtn').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.elevator').css('display','')
        let siblings = $('.elevator').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
        const swiper3 = new Swiper('#swiper3',{
            spaceBetween : 30,
        })
    })

    // 切换到车辆出入模块
    $('#carBtn').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.car').css('display','')
        let siblings = $('.car').siblings()
        for (let i =0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
        const swiper4 = new Swiper('#swiper4',{
            spaceBetween : 30,
        })
    })

    // 启动车辆出入模块滚动
    scrollStart('carBox1','carBox1-1','carBox1-2')
    scrollStart('carBox2','carBox2-1','carBox2-2')
    // 滚动启动函数
    function scrollStart(id,id1,id2) {
        setTimeout(() => {
          var speed = 45;
          var colee2 = document.getElementById(id2);
          var colee1 = document.getElementById(id1);
          var colee = document.getElementById(id);
          colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
          function Marquee1() {
            // console.log(colee1.offsetHeight)
            //当滚动至colee1与colee2交界时
            if (colee2.offsetTop - colee.scrollTop <= 0) {
              colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
            } else {
              colee.scrollTop++;
              if (colee.scrollTop == colee1.offsetHeight) {
                colee.scrollTop = 0;
              }
            }
          }
          var MyMar1 = setInterval(Marquee1,50); //设置定时器
        //   //鼠标移上时清除定时器达到滚动停止的目的
        //   colee.onmouseover = function() {
        //     clearInterval(MyMar1);
        //   };
        //   //鼠标移开时重设定时器
        //   colee.onmouseout = function() {
        //     MyMar1 = setInterval(Marquee1, speed);
        //   };
        }, 100);
    }

    // 切换到气体检测数据模块
    $('#gasBtn').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.gas').css('display','')
        let siblings = $('.gas').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
        const swiper5 = new Swiper('#swiper5',{
            spaceBetween : 30,
        })
    })

    // 切换到龙门吊数据模块
    $('#gantryCrane').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('.gantryCrane').css('display','')
        let siblings = $('.gantryCrane').siblings()
        for (let i = 0; i < siblings.length; i++) {
            $(siblings[i]).css('display','none')
        }
        const swiper6 = new Swiper('#swiper6',{
            spaceBetween : 30,
        })
    })

    // 启动龙门吊实时数据滚动
    scrollStart('gantryBox1','gantryBox1-1','gantryBox1-2')

    // 获取塔吊数据
    axios.get(`http://39.108.103.150:8989/lz/deye/getCraneData?pid=${pid}`).then(
        res => {
            console.log(res.data)
            // 将塔吊的数据渲染到页面中
            let html = ''
            for (let i = 0; i < res.data.length; i++) {
                html += 
                    `<div class="slide-box swiper-slide">
                        <div class="information">
                            <div class="information-left ${res.data[i].MotorStatus!=0?'normal':'anomaly'}">
                                ${res.data[i].MotorStatus!=0?'正常运行':'异常运行'}
                            </div>
                            <div class="information-middle">
                                <div class="name">
                                    今日工作
                                    <span>${res.data[i].name}</span>
                                </div>
                                <div class="time">
                                    上工时间
                                    <span>${res.data[i].startTime!=null?res.data[i].startTime.split(' ')[1]:''}</span>
                                </div>
                            </div>
                            <div class="information-right">
                                <img src="${res.data[i].image}" alt="">
                            </div>
                        </div>
                        <div class="data">
                            <div class="name">
                            ${res.data[i].dname}
                            </div>
                            <div class="top-data">
                                <div class="left-box">
                                    <p>起重</p>
                                    <p>${res.data[i].ratedWeight}t</p>
                                </div>
                                <div class="middle-box">
                                ${res.data[i].moment}%
                                    <p>力距</p>
                                </div>
                                <div class="right-box">
                                    <p>倍率</p>
                                    <p>${res.data[i].multiple}倍</p>
                                </div>
                            </div>
                            <div class="bottom-data">
                                <ul>
                                    <li style="margin-top: 0;">
                                        <div class="icon-box weight"></div>
                                        <div class="li-data">
                                            <p>重量</p>
                                            <p>${res.data[i].weight}t</p>
                                        </div>
                                    </li>
                                    <li style="margin-top: 0;">
                                        <div class="icon-box range"></div>
                                        <div class="li-data">
                                            <p>幅度</p>
                                            <p>${res.data[i].rrange}m</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon-box altitude"></div>
                                        <div class="li-data">
                                            <p>高度</p>
                                            <p>${res.data[i].height}m</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon-box rotation"></div>
                                        <div class="li-data">
                                            <p>回转</p>
                                            <p>${res.data[i].angle}°</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon-box windSpeed"></div>
                                        <div class="li-data">
                                            <p>风速</p>
                                            <p>${res.data[i].windSpeed}m</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon-box dipAngle"></div>
                                        <div class="li-data">
                                            <p>倾角</p>
                                            <p>${res.data[i].obliguity}°</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="service">
                                    检修倒计时 : 
                                    <span class="normal">${res.data[i].ts}天</span>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
            $('#towerCrane').html(html)

            // 初始化塔吊滚动
            const swiper2 = new Swiper('#swiper2',{
                spaceBetween : 30,
            })
        }
    )

    // 获取升降机数据
    axios.get(`http://39.108.103.150:8989/lz/deye/getElevatorData?pid=37348`).then(
        res => {
            let html = ''
            for (let i = 0; i < res.data.length; i++) {
                html += 
                    `<div class="slide-box swiper-slide">
                        <div class="information">
                            <div class="information-left normal">
                                正常运行
                            </div>
                            <div class="information-middle">
                                <div class="name">
                                    今日工作
                                    <span>${res.data[0].name}</span>
                                </div>
                                <div class="time">
                                    上工时间
                                    <span>${res.data[i].startTime!=null?res.data[i].startTime.split(' ')[1]:''}</span>
                                </div>
                            </div>
                            <div class="information-right">
                                <img src="${res.data[0].image}" alt="">
                            </div>
                        </div>
                        <div class="data">
                            <div class="name">
                                ${res.data[0].dname}
                            </div>
                            <div class="data-box">
                                <ul>
                                    <li class="normal green-circle">
                                        ${res.data[0].weight}t
                                        <span>载重</span>
                                    </li>
                                    <li class="normal">
                                        ${res.data[0].height}m
                                        <span>高度</span>
                                    </li>
                                    <li class="normal">
                                        ${res.data[0].fallAlarm==0?'正常':'异常'}
                                        <span>防坠在位监测</span>
                                    </li>
                                    <li class="normal">
                                        ${res.data[0].bottomAlarm==0?'正常':'异常'}
                                        <span>上下限位监测</span>
                                    </li>
                                </ul>
                                <div class="service">
                                    检修倒计时 : 
                                    <span class="normal">${res.data[0].ts}天</span>
                                </div>
                            </div>
                        </div>
                    </div>`
            }
            $('#elevator').html(html)
        }
    )
})