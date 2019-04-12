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
        url: "http://lz.hj-tec.com/home/get/projectData",
        data: {pid:pid},
        dataType: "json",
        success: function(data){
            // console.log(data)
            let html = ''
            for (let i = 0; i < data.gcgk.length; i++) {
                if (i != 0) {
                    html += `<li>${data.gcgk[i].type}：${data.gcgk[i].title}</li>`
                } else {
                    html += `<li>项目名称：龙岗深圳河项目布吉片区</li>`
                }
            }
            for (let i = 0; i < data.cjaw.length; i++) {
                html += `<li>${data.cjaw[i].type}：${data.cjaw[i].title}</li>`
            }
            $('#particulars').html(html) 
        }
    })
})