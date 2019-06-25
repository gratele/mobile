window.onload = function() {
    // 左侧滑动
    // leftSwipe();
    iscrollLeft();
    // 右侧滑动
    rightSwipe();
};

var leftSwipe = function() {
    // 上下滑动 touch事件 位移

    var parentBox = document.querySelector('.cate_left');
    var childBox = parentBox.querySelector('ul');

    var startY = 0;
    var distanceY = 0;

    // 程序的核心点 当前定位
    var currentY = 0;

    childBox.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });

    childBox.addEventListener('touchmove', function(e) {
        var moveY = e.touches[0].clientY
        distanceY = moveY - startY;

        var translateY = currentY + distanceY; //将要去做定位的位置

        childBox.style.transform = 'translateY('+translateY+'px)';
        childBox.style.webkittransform = 'translateY('+translateY+'px)';
    });

    childBox.addEventListener('touchend', function(e) {
        // 滑动完成之后记录的位置
        currentY = currentY + distanceY;
    });
}; 

var iscrollLeft = function() {
    new IScroll(document.querySelector('.cate_left'));
}

var rightSwipe = function() {
    // 使用 iscroll
    // 在谷歌的模拟器下失效
    // 通过参数配置 实现左右滚动
    new IScroll(document.querySelector('.cate_right'), {
        // scrollX: true,
        // scrollY: false
    });
}; 