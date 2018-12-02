"use strict";

$(function () {
  var mybscroll = new BScroll('.wrapper');
  /* var myswiper = new Swiper('.swiper-container'); */

  $.ajax({
    url: '/api/swiper',
    dataType: 'json',
    success: function success(data) {
      if (data.code === 1) {
        renderSwiper(data.swiperdata);
      }
    }
  });

  function renderSwiper(sdata) {
    var html = '';
    sdata.forEach(function (val) {
      html += "<div class=\"swiper-slide\">";
      val.list.forEach(function (ele) {
        html += "<dl>\n                            <dt>\n                                <img src=\"".concat(ele.img, "\" alt=\"\">\n                            </dt>\n                            <dd>").concat(ele.title, "</dd>\n                        </dl>");
      });
      html += "</div>";
    });
    $(".swiper-wrapper").html(html);
    new Swiper(".swiper-container", {
      clickable: true,
      pagination: {
        el: '.swiper-pagination'
      }
    });
  }
});