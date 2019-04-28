$(function(){
    // console.log('hello world')
    let pid = localStorage.getItem('pid')

    // 创建整改单需要上传的数据
    let place = ''      // 具体位置
    let unitId = ''     // 分包单位id
    let fileUrl = ''    // 照片路径
    let describex = ''  // 问题描述
    let rank = 1       // 问题级别
    let deadlineTime = '' // 整改期限
    let rectification = '' // 整改要求

    // 添加照片点击事件
    $('.addPic').on('click',function(){
        $('.camera').click()
    })

    // 照片上传
    $(".camera").change(function(e){
        $('.addPic').css('display','none')
        $('.uploading').css('display','block')
        let headers = {headers: {"Content-Type": "multipart/form-data"}}
        let temp = e.target.files[0]
        file = new FormData() // 创建form对象
        file.append('file',temp) // 通过append向form对象添加数据
        // console.log(file.get('file')) //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        axios.post(`http://39.108.103.150:8989/lz/file/upload?folderName=1`,file,headers).then(
            res => {
                // console.log(res.data.data[0].fileimgurl)
                $('.addPic').attr('src',res.data.data[0].fileimgurl)
                $('.addPic').css('display','block')
                $('.uploading').css('display','none')
                fileUrl = res.data.data[0].fileimgurl
            }
        )
    })

    // 获取分包单位列表
    function getQueryBuildCompanyInFo () {
        axios.post(`http://39.108.103.150:8989/lz/polling/queryBuildCompanyInFo?projectId=${pid}`).then(
            res => {
                // console.log(res.data)
                let html = ''
                for (let i = 0; i < res.data.msg.length; i++) {
                    html += 
                        `<li data-unitid="${res.data.msg[i].id}">${res.data.msg[i].title}</li>`
                }
                $('.unit-box ul').html(html)

                // 分包单位选项栏点击事件
                $('.unit-box ul li').on('click',function(event){
                    event.stopPropagation()
                    $('.unit-box').css('display','none')
                    // $('.shade-box').css('display','none')
                    // console.log($(this).data('unitid'))
                    unitId = $(this).data('unitid')
                    $('.unit .text').html(`${$(this).text()}<i></i>`)
                })
            }
        )
    }

    getQueryBuildCompanyInFo()

    // 设置整改期限
    let calendar = new datePicker()
    calendar.init({
        'trigger': '.deadline', /*按钮选择器，用于触发弹出插件*/
        'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
        'minDate':'1900-1-1',/*最小日期*/
        'maxDate':'2100-12-31',/*最大日期*/
        'onSubmit':function(){/*确认时触发事件*/
            let theSelectData = calendar.value;
            // console.log(theSelectData)
            $('.deadline span').html(theSelectData)
            deadlineTime = theSelectData
        },
        'onClose':function(){/*取消时触发事件*/
            // console.log(`123`)
        }
    })

    // 问题级别选择
    $('.rank .button-box div').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
        // console.log($(this).data('rank'))
        rank = $(this).data('rank')
    })

    // 选择分包单位
    $('.unit').on('click',function(){
        $('.unit-box').css('display','block')
    })

    // 创建巡检单
    $('.countersign').on('click',function(){
        place = $('.position input').val()
        // console.log(place)
        describex = $('.describe textarea').val()
        // console.log(describex)
        rectification = $('.require textarea').val()
        // console.log(rectification)
        axios.post(`http://39.108.103.150:8989/lz/polling/addPolling?place=${place}&describex=${describex}&rectification=${rectification}&unitId=${unitId}&fileUrl=${fileUrl}&rank=${rank}&deadlineTime=${deadlineTime}&projectId=${pid}`).then(
            res => {
                console.log(res.data)
                if (res.data.msg=='发起成功！') {
                    location = '../components/quality.html'
                } else {
                    alert('')
                }
            }
        )
    })
})