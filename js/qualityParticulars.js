$(function (){
    let pid = localStorage.getItem('pid')

    // 提交整改所需数据
    let type = getQueryString('type')                       // 表单状态
    let pollingId = getQueryString('pollingId')             // 发起整改id
    let pollingDetailId = getQueryString('pollingDetailId') // 整改流程id
    let describex = ''                                      // 整改描述
    let fileUrl = ''                                        // 照片路径
    let isAvailable = ''                                    // 整改单状态

    // console.log(`123`)
    // 整改点击事件
    $('.abarbeitung-button').on('click',function(event){
        event.stopPropagation()
        isAvailable = 1
        $('.abarbeitung-box').css('display','block')
    })

    // 获取整改单id
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    // 获取整改单详情页
    function getQueryPollingIs() {
        // 获取url中的整改单id
        // console.log(pollingId)
        axios.post(`http://39.108.103.150:8989/lz/polling/queryPollingIs?pollingId=${pollingId}&type=${type}`).then(
            res => {
                let number = 1
                console.log(res.data)
                for (let i = 0; i < res.data.msg.length; i++) {
                    if (res.data.msg[i].isAvailable == 2 || res.data.msg[i].isAvailable == 1) {                    
                        html += 
                            `<div class="title">
                                第${number}次整改
                            </div>
                            <div class="describe">
                                <p>整改结果</p>
                                <span>${res.data.msg[i].describex}</span>
                            </div>
                            <div class="name">
                                整改后照片
                            </div>
                            <div class="pic-box" style="margin-bottom: .175rem">
                                <img src="${res.data.msg[i].fileUrl}" alt="">
                            </div>`
                            number++
                    }
                    if (res.data.msg[i].isAvailable == 6 || res.data.msg[i].isAvailable == 5) {
                        html += 
                            `<div class="justify">
                                <span>复查人</span>
                                <span class="white-color">某某某</span>
                            </div>
                            <div class="justify">
                                <span>复查意见</span>
                                <span class="white-color">${res.data.msg[i].isAvailable == 6?'不通过':'通过'}</span>
                            </div>
                            <div class="name">
                                复查后照片
                            </div>
                            <div class="pic-box" style="margin-bottom: .25rem">
                                <img src="${res.data.msg[i].fileUrl}" alt="">
                            </div>
                            <div class="line"></div>`
                    }
                }
                $('.centent-box').html(html)
            }
        )
    }

    // 获取复查单详情页

    // 获取整改单详情页数据
    let polling = ''
    function getQueryPolling() {        
        axios.post(`http://39.108.103.150:8989/lz/polling/queryPolling?examineUserId=${pid}&type=${type}`).then(
            res => {
                // console.log(res.data)
                for (let i = 0; i < res.data.msg.length; i++) {
                    if (res.data.msg[i].pollingId == pollingId) {
                        console.log(res.data.msg[i])
                        polling = res.data.msg[i]
                        setCentent()
                        setState()
                    }
                }
            }
        )
    }

    // 渲染整改单详情页
    let html = ''
    function setCentent() {
        html = 
            `<div class="title">
                ${polling.describex}
            </div>
            <div class="justify">
                <span>检查区域</span>
                <span class="white-color">${polling.place}</span>
            </div>
            <div class="justify">
                <span>分包单位</span>
                <span class="white-color">${polling.unitTitle}</span>
            </div>
            <div class="border-bottom"></div>
            <div class="justify">
                <span>问题级别</span>
                <span class="${polling.rank==1?'slight':polling.rank==2?'ordinary':'severity'}">${polling.rank==1?'轻微':polling.rank==2?'一般':'严重'}</span>
            </div>
            <div class="pic-box">
                <img src="${polling.fileUrl}" alt="">
            </div>
            <div class="justify">
                <span>检查人</span>
                <span class="white-color">某某某</span>
            </div>
            <div class="justify">
                <span>检查时间</span>
                <span class="white-color">${polling.createTime}</span>
            </div>
            <div class="line"></div>
            <div class="title">
                整改通知
            </div>
            <div class="justify">
                <span>整改人</span>
                <span class="white-color">某某某</span>
            </div>
            <div class="justify">
                <span>整改时限</span>
                <span class="white-color">${polling.deadlineTime}</span>
            </div>
            <div class="describe">
                <p>整改要求</p>
                <span>${polling.rectification}</span>
            </div>
            <div class="line"></div>`
        getQueryPollingIs()
    }

    getQueryPolling()

    // 上传照片信息
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

    // 确认取消点击事件
    $('.abarbeitung-affirm').on('click',function(event){
        event.stopPropagation()
        describex = $('.abarbeitung-box textarea').val()
        axios.post(`http://39.108.103.150:8989/lz/polling/updatePollingDetail?id=${pollingDetailId}&pollingId=${pollingId}&examineUserid=${pid}&describex=${describex}&fileUrl=${fileUrl}&isAvailable=${isAvailable}`).then(
            res => {
                console.log(res.data)
                if (res.data.msg == '整改成功！等待审核') {
                    location = '../components/quality.html'
                } else {
                    alert(`数据上传失败！请重试`)
                }
            }
        )
    })
    $('.abarbeitung-cancel').on('click',function(event){
        event.stopPropagation()
        console.log(`123`)
        $('.abarbeitung-box').css('display','none')
    })

    // 根据整改单状态渲染按钮跟头部
    function setState() {
        if (type == 0) {
            $('.state-box').html(
                `<div class="state">
                    待整改
                </div>
                <div class="time">
                    创建时间： ${polling.createTime}
                </div>`
            ).addClass('orange-color')
            $('.abarbeitung-button').css('display','block')
            $('.review-button').css('display','none')
        } else if (type == 1) {
            $('.state-box').html(
                `<div class="state">
                    待复查
                </div>
                <div class="time">
                    创建时间： ${polling.createTime}
                </div>`
            ).addClass('orange-color')
        } else if (type == 2) {
            $('.state-box').html(
                `<div class="state">
                    已完成
                </div>
                <div class="time">
                    创建时间： ${polling.createTime}
                </div>`
            ).addClass('green-color')
            $('.review-button').css('display','none')
        }
    }

    // 通过或不通过点击事件
    $('.review-button .pass').on('click',function(event){
        event.stopPropagation()
        isAvailable = 5
        $('.review-box').css('display','block')
    })
    $('.review-button .no-pass').on('click',function(event){
        event.stopPropagation()
        isAvailable = 6
        $('.review-box').css('display','block')
    })

    // 添加照片点击事件
    $('.review-addPic').on('click',function(){
        $('.review-camera').click()
    })

    // 照片上传
    $(".review-camera").change(function(e){
        $('.review-addPic').css('display','none')
        $('.review-uploading').css('display','block')
        let headers = {headers: {"Content-Type": "multipart/form-data"}}
        let temp = e.target.files[0]
        file = new FormData() // 创建form对象
        file.append('file',temp) // 通过append向form对象添加数据
        // console.log(file.get('file')) //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        axios.post(`http://39.108.103.150:8989/lz/file/upload?folderName=1`,file,headers).then(
            res => {
                // console.log(res.data.data[0].fileimgurl)
                $('.review-addPic').attr('src',res.data.data[0].fileimgurl)
                $('.review-addPic').css('display','block')
                $('.review-uploading').css('display','none')
                fileUrl = res.data.data[0].fileimgurl
            }
        )
    })

    // 确认取消点击事件
    $('.review-affirm').on('click',function(event){
        event.stopPropagation()
        describex = $('.review-box textarea').val()
        axios.post(`http://39.108.103.150:8989/lz/polling/updatePolling?id=${pollingDetailId}&pollingId=${pollingId}&examineUserid=${pid}&describex=${describex}&fileUrl=${fileUrl}&isAvailable=${isAvailable}`).then(
            res => {
                console.log(res.data)
                if (res.data.msg == '审核成功！') {
                    location = '../components/quality.html'
                } else {
                    alert(`数据上传失败！请重试`)
                }
            }
        )
    })
    $('.review-cancel').on('click',function(event){
        event.stopPropagation()
        console.log(`123`)
        $('.review-box').css('display','none')
    })
})