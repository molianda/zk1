/*
 * @Author: 田佳茹 
 * @Date: 2018-12-03 10:06:20 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-03 10:10:09
 */

$(function() {
    new Swiper('.swiper-container', {
        pagination: {
            "el": '.swiper-pagination'
        }
    });
    $.ajax({
        url: '/api/bscroll',
        dataType: 'json',
        success: function(data) {
            if (data.code === 1) {
                renderbs(data.data);
            }
        }
    });

    function renderbs(data) {
        var html = '';
        data.forEach(function(val) {
            html += `<dl>
                    <dd><img src="${val.img}" alt=""></dd>
                    <dt>
                        <div class="title">${val.title}</div>
                        <div class="sui">
                            <div class="money">${val.money}</div>
                            <div class="pri">${val.pri}</div>
                            <div class="peop">${val.peop}</div>
                        </div>
                    </dt>
                </dl>`;
        });
        $('.list').html(html);
    }
})