window.onload = function() {
  //  初始化页面功能
  // 搜索
  search();
  // 轮播图
  banner();
  // 倒计时
  downTime();
};

var search = function() {
  // 1. 页面初始化的时候， 距离顶部是0的距离的时候 透明度是0
  // 2. 当距离滚动的时候 随着页面距离顶部的距离变大 透明度变大
  // 3. 当滚动的距离超过看轮播图的距离的时候 保持不变

  // 监听页面滚动的距离
  // 获取dom元素
  var search = document.querySelector(".jd_search_box");
  var banner = document.querySelector(".jd_banner");
  // 距离范围
  var height = banner.offsetHeight;

  window.onscroll = function() {
    // 当前页面滚动的距离
    var top = document.body.scrollTop; //谷歌
    // var top = this.document.documentElement.scrollTop; IE

    var opacity = 0;

    if (top > height) {
      // 3. 当滚动的距离超过看轮播图的距离的时候 保持不变
      opacity = 0.85;
    } else {
      // 2. 当距离滚动的时候 随着页面距离顶部的距离变大 透明度变大
      opacity = 0.85 * (top / height);
    }

    // 设置颜色给搜索盒子
    search.style.background = "rgba(216,80,92," + opacity + ")";
  };
};

var banner = function() {
  // 1. 无缝滚动和无缝滑动 （定时器 过渡 位移）
  // 2. 点盒子对应改变    （改变当前样式）
  // 3.可以滑动       （touch事件 监听触摸点坐标改变距离 位移）
  // 4.当滑动距离不够的时候 吸附回去  （过渡 位移）
  // 5.当滑动距离够了的时候 跳转 上一张 下一张  （判断方向 过渡 位移）

  var banner = document.querySelector(".jd_banner");
  var width = banner.offsetWidth; //轮播图宽度
  // querySelector 用的选择器就是css当中的有效选择器
  var imageBox = banner.querySelector("ul:first-child");
  var pointBox = banner.querySelector("ul:last-child");
  var points = pointBox.querySelectorAll("li");

  // 提几个公用的方法
  // 加过渡
  var addTransition = function() {
    imageBox.style.transition = "all 0.2s";
    imageBox.style.webkitTransition = "all 0.2s"; // 兼容
  };
  //清过渡
  var removeTransition = function() {
    imageBox.style.transition = "none";
    imageBox.style.webkitTransition = "none";
  };
  // 设置位移
  var setTransitionX = function(transitionX) {
    imageBox.style.transform = "translateX(" + transitionX + "px)";
    imageBox.style.webkittransform = "translateX(" + transitionX + "px)"; // 兼容
  };
  // 1. 无缝滚动和无缝滑动 （定时器 过渡 位移）
  var index = 1; //默认索引
  var timer = setInterval(function() {
    index++;
    // 过渡
    addTransition();
    // 位移
    setTransitionX(-index * width);
  }, 3000);

  //   怎么监听过渡结束这个时间点 过渡结束事件
  imageBox.addEventListener("transitionend", function() {
    //   无缝滚动
    if (index >= 9) {
      // 瞬间定位到第一张
      index = 1;
      // 清除过滤
      removeTransition();
      // 再定位
      setTransitionX(-index * width);
    } else if (index <= 0) {
      // 无缝滑动
      index = 8;
      removeTransition();
      setTransitionX(-index * width);
    }
    // index 取值范围 1-8 对应的点 0-7
    setPoint();
  });

  // 2. 点盒子对应改变    （改变当前样式）
  var setPoint = function() {
    // index 1-8
    // 去除所有的now样式
    for (var i = 0; i < points.length; i++) {
      points[i].classList.remove("now");
    }
    // 给对应的点加上 now 样式
    points[index - 1].classList.add("now");
  };

  // 3.可以滑动       （touch事件 监听触摸点坐标改变距离 位移）

  var startX = 0; // 记录开始的x坐标
  var distanceX = 0; //记录坐标轴的改变
  // 严谨判断
  var isMove = false;
  imageBox.addEventListener("touchstart", function(e) {
    //   记录开始的位置
    startX = e.touches[0].clientX;
  });

  imageBox.addEventListener("touchmove", function(e) {
    //   清除定时器
    clearInterval(timer);
    var moveX = e.touches[0].clientX;
    distanceX = moveX - startX; // distanceX > 0 向右滑动 distanceX0 < 0 向左滑动
    // 滑动 基于当前的位置移动
    // 计算将要去做的定位
    var translateX = -index * width + distanceX;
    // 清除过渡
    removeTransition();
    setTransitionX(translateX);
    isMove = true;
  });

  imageBox.addEventListener("touchend", function(e) {
    //   滑动事件结束之后来判断当前滑动的距离
    // 如果大于1/3切换图片， 反之吸附回去定位回去
    if (isMove) {
      if (Math.abs(distanceX) < width / 3) {
        // 4.当滑动距离不够的时候 吸附回去  （过渡 位移）
        // 加过渡
        addTransition();
        // 位移
        setTransitionX(-index * width);
      } else {
        // 5.当滑动距离够了的时候 跳转 上一张 下一张  （判断方向 过渡 位移）
        if (distanceX > 0) {
          // 向右滑动 上一张
          index--;
        } else {
          // 向左滑动 下一张
          index++;
        }
        addTransition();
        setTransitionX(-index * width);
      }
    }

    clearInterval(timer); //严谨做法 保证只加一次
    timer = setInterval(function() {
      index++;
      // 过渡
      addTransition();
      // 位移
      setTransitionX(-index * width);
    }, 3000);
    // 重置参数 不仅一次滑动
    startX = 0;
    distanceX = 0;
    isMove = false;
  });
};

var downTime = function() {
  // 1.模拟倒计时的时间 11个小时
  // 2.利用定时器 1s一次 重写展示时间
  var time = 60*60*12;
  var skTime = document.querySelector('.seckill_timer');
  var spans = skTime.querySelectorAll('span');

  var timer = setInterval(function() {
    time--;
    // 格式化时间
    var hours = Math.floor(time/3600);
    var minutes = Math.floor(time%3600/60);
    var seconds = time%60;

    // 设置时间
    spans[0].innerHTML = Math.floor(hours/10);
    spans[1].innerHTML = hours%10;

    spans[3].innerHTML = Math.floor(minutes/10);
    spans[4].innerHTML = minutes%10;

    spans[6].innerHTML = Math.floor(seconds/10);
    spans[7].innerHTML = seconds%10;

    if(time <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};
