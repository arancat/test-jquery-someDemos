var ppt = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    len: $('.slider').length,
    nowIndex: 0,
    // 最开始没有上一页所以是undefined
    lastIndex:undefined,
    flag:true,
    slider_timer: undefined,
    init: function () {
        if(this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.slider_auto();
        }
    },
    createDom: function (len) {
        var strLi = '',
            strBtn = '';
        for (var i = 0; i < len; i++) {
            if(i == 0) {
                strLi += '<li class="active"></li>';
            }else {
                strLi += '<li></li>';
            }
        }
        strLi = '<div class="slider-order"><ul>' + strLi + '</ul></div>';
        strBtn =  '<div class="slider-btn">\
                        <span class="left-btn"></span>\
                        <span class="right-btn"></span>\
                    </div>'
        //链式操作
        this.$wrapper.append(strLi).append(strBtn);
    },
    bindEvent: function () {
        // this->ppt
        //一定要判断是要寻找dom还是PPT对象呢
        var  _this = this;
        $('.left-btn').add($('.right-btn')).add($('.slider-order li')).on('click', function(){
            if($(this).attr('class') == 'left-btn') {
                _this.totalFun('left');
            }else if($(this).attr('class') == 'right-btn') {
                _this.totalFun('right');
            }else {
                var value = $(this).index();
                _this.totalFun(value);
            }

        });
        // 绑定一个事件，自己来触发
        this.$slider.on('go', function () {
            // 淡出
            $(this).fadeOut(300)
            .find($('p')).animate({fontSize: '16px'}).end()
            .find($('.image')).animate({width: '0%'});
        })
        this.$slider.on('come', function () {
            // 淡入淡出效果之间要被看到，所以要加一个延迟时间
            $(this).delay(300).fadeIn(300)
            // 这里空出来的如果作用在同一页上就需要顺序等待，所以时间长一些↑
            .find($('p')).delay(300).animate({fontSize: '20px' }).end()
            .find($('.image')).delay(300).animate({width: '40%'}, function () {
                _this.flag = true;//频繁的点击
            });
        })
    },
    getIndex: function (deriction) {
        this.lastIndex = this.nowIndex; 
        if(deriction == 'left' || deriction == 'right') {
            if(deriction == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        }else {
            this.nowIndex = this.nowIndex == this.len -1 ? 0 : this.nowIndex + 1;
        }
    }else {
            this.nowIndex = deriction;
      }
    },
    changeOrder: function (index) {
        $('.active').removeClass('active');
         $('li').eq(this.nowIndex).addClass('active');
    }, 
    totalFun: function(deriction) {

        if(this.flag) {
            this.getIndex(deriction);
            // 是否相等，不执行。可以避免延迟
            if(this.nowIndex != this.lastIndex) {
                // 锁——做一个动画不要其他的影响
                this.flag = false;
                this.$slider.eq(this.lastIndex).trigger('go');
                this.$slider.eq(this.nowIndex).trigger('come');
                this.changeOrder(this.nowIndex);
                this.slider_auto();
            }

        }

    },
    slider_auto: function () {
        var _this = this;
        clearTimeout(this.slider_timer);
        this.slider_timer = setTimeout(function () {
            _this.totalFun('right');
        }, 3000) ;
    }
}
ppt.init();