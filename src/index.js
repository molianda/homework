$(function() {
    var mybscroll = new BScroll('.wrapper');
    /* var myswiper = new Swiper('.swiper-container'); */
    $.ajax({
        url: '/api/swiper',
        dataType: 'json',
        success: function(data) {
            if (data.code === 1) {
                renderSwiper(data.swiperdata);
            }
        }
    });

    function renderSwiper(sdata) {
        var html = '';
        sdata.forEach(function(val) {
            html += `<div class="swiper-slide">`
            val.list.forEach(function(ele) {
                html += `<dl>
                            <dt>
                                <img src="${ele.img}" alt="">
                            </dt>
                            <dd>${ele.title}</dd>
                        </dl>`;
            })
            html += `</div>`;
        });
        $(".swiper-wrapper").html(html);
        new Swiper(".swiper-container", {
            clickable: true,
            pagination: {
                el: '.swiper-pagination'
            }
        });
    }
})