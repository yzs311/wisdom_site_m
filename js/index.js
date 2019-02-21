$(function(){
    // FastClick.attach(document.body)
    // 判断账号密码是否正确
    const height = $('body').height()
    $('body').height(height)
    $(".login-button").on("click",function(){
        if($("#user").val() == "123" && $("#password").val() == "123") {
            //登录成功时跳转到首页
            alert('登录成功')
            location = '../components/homePage.html'
        }else {
            //登录失败时提示账号或密码错误，并清空账号密码输入框让用户重新输入
            alert('账号或密码错误，请重新输入')
            $("#user").val('')
            $("#password").val('')
        }
    })
})