var total = 15,
    liWidth = ($('ul').width() - 24 ) / 4,
    activeIndex,
    // 屏幕宽高比
    ratio = $(window).height() / $(window).width();


function render() {
     var str = '';
    for(var i = 0; i < total; i++) {
        str += '<li style="height: ' + liWidth + 'px"><img src="./src4/images/' + i +'.png"/></li>';
    }
    $(str).appendTo($('.wrapper')).animate({opacity: 1}, 500);
}
render();

$('ul').on('tap', 'li', function() {
    var activeIndex = $(this).index();
    show(activeIndex);  
})

function show(i) {
    $('.show').html("").show();
    var oImg = new Image(); 
    oImg.src = './src/images/' + i + '.png';
    oImg.onload = function () {
        var h = this.height,
            w = this.width;

        if(h/w > ratio) {
            $(this).appendTo($('.show')).css('height', '100%').animate({opacity: 1}, 500);
        }else {
            $(this).appendTo($('.show')).css('width', '100%').animate({opacity: 1}, 500);
        }
    }
}
$('.show')
    .on('tap', function (){
        $(this).hide();
    })
    .on('swipeLeft', function () {
        activeIndex >= total -1 ? total -1 : activeIndex++;
        console.log(activeIndex);
        show(activeIndex);
    })
    .on('swipeRight', function () {
        activeIndex <= 0 ? 0 : activeIndex--;
        console.log(activeIndex);
        show(activeIndex);
    })