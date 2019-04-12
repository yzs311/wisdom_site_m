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
    const swiper2 = new Swiper('#swiper2',{
        spaceBetween : 30,
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
})