# mobile
Imitation of jingdong mobile app

### 为什么不使用jQuery

    1.jQuery体积大 渲染过大，影响性能
    2.jQuery做了大量的兼容  没有必要那么大的兼容   都是高版本浏览器
        并不是说一定不用    只是说最好不用

### 搜索效果

###    touch 事件
    移动端持有事件 触屏设备特有的事件   Android，ios 设备

    touchstart 手指刚刚触摸到屏幕的时候 触发的事件
    touchmove   手机在屏幕上滑动的时候  会不停的触发
    touchend    手指离开屏幕的时候      触发的事件
    touchcancel 被迫中止(来电)滑动      触发的事件  

    如何使用这些事件
    绑定：on 绑定 但是第二次使用会被覆盖
    ```` javasript

        var dom = document.querySelector('div');
        // touchstart
        dom.addEventListener('touchstart', function() {
            console.log('touchstart')
        }); //谷歌
        // dom.attachEvent() // IE
        // dom.ontouchstart

        dom.addEventListener('touchmove', function() {
            console.log('touchmove')
        });

        dom.addEventListener('touchend', function() {
            console.log('touchend')
        });
    ````

    滑动效果分析
        依靠touch相关事件，根据触摸位置的改变，改变对应元素的位移translate

    1.怎么监听位置的改变
    2.怎么获取当前的坐标
    3.计算位移再设置

    触摸事件包含4个接口。
    TouchEvent

    代表当触摸行为在平面上变化的时候发生的事件.

    Touch

    代表用户手指与触摸平面间的一个接触点.

    TouchList

    代表一系列的Touch; 一般在用户多个手指同时接触触控平面时使用这个接口.

    DocumentTouch

    包含了一些创建 Touch对象与TouchList对象的便捷方法.

    （参考于 https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events ）

    TouchEvent接口可以响应基本触摸事件（如单个手指点击），它包含了一些具体的事件,
    事件类型：

        touchstart : 触摸开始（手指放在触摸屏上）

        touchmove : 拖动（手指在触摸屏上移动）

        touchend : 触摸结束（手指从触摸屏上移开）

        touchenter ：移动的手指进入一个dom元素。

        touchleave ：移动的手指离开一个dom元素。

        还有一个touchcancel，是在拖动中断时候触发。

    事件属性：

        altKey : 该属性返回一个布尔值，表示在指定的事件发生时，Alt 键是否处于按下状态， event.altKey=true|false|1|0

        type : 触摸时触发的事件类型，比如touchstart

        每个触摸事件都包括了三个触摸属性列表：

        1. touches：当前位于屏幕上的所有手指触摸点的一个列表。

        2. targetTouches：当前元素对象上所有触摸点的列表。

        3. changedTouches：涉及当前事件的触摸点的列表。

        它们都是一个数组，每个元素代表一个触摸点。

        每个触摸点对应的Touch都有三对重要的属性，clientX/clientY、pageX/pageY、screenX/screenY。

        其中screenX/screenY代表事件发生的位置对于屏幕的偏移量，clientX/clienYt和pageX/pageY都代表事件发生位置对应对象的偏移量，不过区别是clientX/clientY不包括对象滚动而隐藏的偏移量，而pageX/pageY包括对象滚动而隐藏的偏移量。移开屏幕的那个触摸点，只会包含在changedTouches列表中，而不会包含在touches 和targetTouches 列表中， 所以changedTouches在项目当中会比较常用。


    触摸点的集合 （TouchList） 记录触摸点的， 只有一个手指触摸时 事件长度为1
    changedTouches  当前页面最新改变的触摸点集合    整个事件都会有changedTouches记录
    targetTouches   记录当前元素上面的所有触摸点集合    touchend时没有记录
    touches         记录页面上所有的触摸点集合          touchend时没有记录

    获取坐标
        touch
            clientX
            clientY
            当前视口触摸点的坐标
            pageX
            pageY
            基于当前页面触摸点的坐标
            screenX
            screenY
            基于当前屏幕触摸点的坐标

### 轮播图
    衍生出 左滑和右滑 手势事件
### 倒计时

### 移动端滑动效果
    滑动效果分析
    依靠touch相关事件，根据触摸位置的改变，改变对应元素的位移translate

### 移动端 轻触事件 （tap）
    tap 轻触
    移动端的click事件有关
    移动端有没有click事件 有

    click事件在移动端的特点： 300ms延时（为了区别是否移动 touchmove）

    问题： 造成响应过慢 用户体验过慢
    解决方案：
        1.  tap(是比click响应更快的事件， touch衍生过来的)
            zepto 移动端的js库 包含了 tap事件
        2.  插件 fastclick
            FastClick 是一个非常方便的库， 在移动浏览器上发现介于轻敲以及点击之间的指令时，能够让你摆脱300ms的延迟
            
### 列表（分类）页面

    两栏自适应的方案：
        一侧宽度浮动 另一侧设置 overflow:hidden
        overflow: hidden; 设置当前元素 为绝缘容器 不受其他元素影响 也不影响其他元素

