$(function (){
    // console.log(`123`)
    // 整改点击事件
    $('.abarbeitung-button').on('click',function(event){
        event.stopPropagation()
        $('.review-box').css('display','block')
    })

    // 确认取消点击事件
    $('.cancel').on('click',function(event){
        event.stopPropagation()
        $('.review-box').css('display','none')
    })
    $('.affirm').on('click',function(event){
        event.stopPropagation()
        $('.review-box').css('display','none')
    })
})