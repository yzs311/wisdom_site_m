$(function(){
    // FastClick.attach(document.body)
    // console.log('hello world')
    let pid = localStorage.getItem('pid')
    
    // 初始化swiper
    const swiper1 = new Swiper('#swiper1', {
        loop : true,
        autoplay:true,
        pagination: {
            el: '.swiper-pagination',
        },
    })
    const swiper2 = new Swiper('#swiper2', {
        slidesPerView: 4,
        freeMode : true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })

    // 获取首页数据
    $.ajax({
        type: "GET",
        url: "http://39.108.103.150:8989/home/get/projectData",
        data: {pid:pid},
        dataType: "json",
        success: function(data){
            // console.log(data)
            let html1 = ''
            let html2 = ''
            for (let i = 0; i < data.gcgk.length; i++) {
                 html1 += `<li>${data.gcgk[i].type}：${data.gcgk[i].title}</li>`
            }
            for (let i = 0; i < data.cjaw.length; i++) {
                html2 += `<li>${data.cjaw[i].type}：${data.cjaw[i].title}</li>`
            }
            $('.no-scroll').html(html1)
            $('#particulars').html(html2) 
            scrollStart('scrollBox','particulars','scrollBox2')
        }
    })

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
})