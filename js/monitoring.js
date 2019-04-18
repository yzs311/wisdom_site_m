$(function(){
    let pid = localStorage.getItem('pid')

    $.ajax({
        type: "GET",
        url: "http://39.108.103.150:8989/lz/video/getProjectVideoArea",
        data: {pid:pid},
        dataType: "json",
        success: function (data) {
            console.log(data)
            let html = ''
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].url[0].url)
                html += 
                    `<div class="monitoring">
                        <video class="player1" width="100%" height="100%"
                            controls="controls" autoplay="autoplay"
                            x-webkit-airplay="true" x5-video-player-fullscreen="true"
                            preload="auto" playsinline="true" webkit-playsinline
                            x5-video-player-typ="h5"&gt;
                            <source type="application/x-mpegURL" src="${data[i].url[0].url}">
                        </video>
                    </div>`
            }
            $('#content').html(html)
        }
    })
})