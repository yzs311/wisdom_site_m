$(function(){
    // FastClick.attach(document.body)
    $(".login-button").on("click",function(){
        if($("#user").val() == 'admin' && $("#password").val() == "admin") {
            alert('登录成功')
            location = '../components/homePage.html'
        }else {
            alert('账号或密码错误，请重新输入')
            $("#user").val('')
            $("#password").val('')
        }
    })
})