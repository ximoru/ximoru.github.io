/**
 * Created by zhousg on 2016/2/17.
 */
window.onload = function(){
    leftSwipe();
}
/*左侧滑动*/
function leftSwipe(){
    /*
     * 1.滑动起来
     * 2.滑动超过一定距离时候 需要一个吸附的效果
     * 3.点击 滑动到当前点击的元素 顶端   同时改变当前的选中元素
     * 4.在点击下面的一些元素的 时候不需要定位
     * */

    /*父盒子*/
    var parentBox = document.getElementsByClassName('jd_category_left')[0];
    /*子盒子*/
    var childBox = parentBox.getElementsByTagName('ul')[0];

    /*有两个区间  滑动区间  缓冲区间*/

    /*父容器的高度*/
    var parentH = parentBox.offsetHeight;
    /*子容器的高度*/
    var childH = childBox.offsetHeight;

    /*定位区间 缓冲区间*/
    var maxPosition = 0;
    var minPosition = -(childH - parentH);

    /*缓冲的距离*/
    var distance = 150;

    /*滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*公用方法*/
    /*定位*/
    var setTranslateY = function(translateY){
        /*效率更高*/
        childBox.style.transform = 'translateY('+translateY+'px)';
        childBox.style.webkitTransform = 'translateY('+translateY+'px)';
    }
    /*加过渡*/
    var addTransition = function(){
        childBox.style.transition = 'all .2s ease';
        childBox.style.webkitTransition = 'all .2s ease';
    }
    /*清楚过渡*/
    var removeTransition = function(){
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    }

    /*滑动*/
    var startY = 0;/*开始Y坐标*/
    var moveY = 0;/*滑动时候的Y坐标*/
    var distanceY = 0;/*滑动的距离*/
    /*记录当前的定位*/
    var currY = 0;

    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        /*判断是否再滑动区间内 才允许滑动*/
        /*首先知道 当前滑动的时候的定位  还需要知道 滑动区间*/
        if((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe){
            removeTransition();
            setTranslateY(currY + distanceY);
        }
    });
    window.addEventListener('touchend',function(){
        console.log(currY);
        /*计算 当前滑动结束之后的位置*/
        currY = currY + distanceY;

        if(currY > maxPosition){
            currY = maxPosition;
            addTransition();
            setTranslateY(currY);
        }else if(currY < minPosition){
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }




        /*重置记录的参数*/
        startY = 0;
        moveY = 0;
        distanceY = 0;
    });

    var lisDom = childBox.getElementsByTagName('li');
    /*点击*/
    itcast.tap(childBox,function(e){
        var liDom  = e.target.parentNode;
        /*改变样式*/
        for(var i = 0 ; i < lisDom.length ; i ++){
            lisDom[i].className = " ";
            /*给所有的li加上索引*/
            lisDom[i].index = i;
        }
        liDom.className = 'now';
        /*需要计算定位*/
        var position = - liDom.index * 50;
        /*在改变的时候需要 重新记录当前的定位*/
        if(position <= maxPosition && position > minPosition){
            currY = position;
            addTransition();
            setTranslateY(currY);
        }else{
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }

    });
}
