$(function () {
    let pid = localStorage.getItem('pid')
    let folderDataList = []
    let fileDataList = []
    let parentId = 0

    // 遍历文件夹列表
    axios.post(`http://39.108.103.150:8989/lz/folder/queryFolder?projectId=${pid}`).then(
        res => {
            // folderData = res.data
            // console.log(res.data)
            printobj(res.data)
            function printobj(obj){
                for(var k in obj){//遍历对象和数组
                    // console.log(obj[k])
                    folderDataList.push(obj[k])
			        if(obj[k].children.length > 0){  // 判断如果children里有内容则递归
                        printobj(obj[k].children)
			        }
                }
            }
        }
    )

    // 遍历文件列表
    axios.post(`http://39.108.103.150:8989/lz/file/queryFile?page=1&pageSize=10000&uploader=${pid}`).then(
        res => {
            // console.log(res.data.rows)
            fileDataList = res.data.rows
            setList(parentId)
        }
    )

    // console.log(folderDataList)
    
    // 渲染列表
    function setList(parentId) {
        let folderHtml = ''
        let fileHtml = ''

        // 将文件夹数据添加到页面中
        for (let i = 0; i < folderDataList.length; i++) {
            // console.log(folderDataList[i])
            if (folderDataList[i].parentId == parentId) {
                folderHtml += 
                    `<li data-folderId=${folderDataList[i].folderId}>
                        <div class="icon-box"></div>
                        <div class="text-box">
                            <span>${folderDataList[i].folderName}</span>
                        </div>
                        <div class="line"></div>
                    </li>`
            }
        }

        // 将文件数据添加到页面中
        for (let i = 0; i < fileDataList.length; i++) {
            // console.log(fileDataList[i])
            if (fileDataList[i].folderId == parentId) {
                fileHtml += 
                    `<li data-fileId=${fileDataList[i].fileId}>
                        <div class="icon-box pdf-icon"></div>
                        <div class="text-box">
                            <p class="name">${fileDataList[i].fileName}</p>
                            <p class="message">${fileDataList[i].fileSize}KB ${fileDataList[i].createTime}</p>
                        </div>
                        <div class="line"></div>
                    </li>`
            }
        }

        $('.tier ul').html(folderHtml)
        $('.last ul').html(fileHtml)

        if (folderHtml=='' && fileHtml=='') {
            // console.log(`123`)
            $('.no-data').css('display','block')
        } else {
            $('.no-data').css('display','none')
        }
    }

    // 文件夹点击事件
    $('.tier ul').on('click','li',function(){
        // console.log($(this).data('folderid'))
        parentId = $(this).data('folderid')
        setList(parentId)
    })

    // 文件点击事件（下载）
    $('.last ul').on('click','li',function () {
        // 根据文件id调用下载接口
        // console.log($(this).data('fileid'))
        location.href=`http://39.108.103.150:8989/lz/file/download?fileId=${$(this).data('fileid')}`
    })

    // 返回点击事件
    $('.return').on('click',function () {
        for (let i = 0; i < folderDataList.length; i++) {
            if (folderDataList[i].folderId == parentId) {
                // console.log(folderDataList[i])
                parentId = folderDataList[i].parentId
            }
        }
        setList(parentId)
    })
})