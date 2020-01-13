/**
    按照iScroll的代码，抄出来一个简单的scroll
    *. 不考虑浏览器的兼容性
    *. 不支持用户的自定义配置 
    *. 只使用transition/transform， 不使用js动画
    *. 只支持touch/mouse 没有pointer事件
    *. 只在浏览器中使用
    *. 不能自定义事件
    *. 不能触发click事件
    *. 不支持 scrollbar
 */

 /**
    touchstart
    touchmove{0, n}
    touchend
    // if touch event handler called preventDefault(), mouse event and click will not be fired !!!
    mousemove
    mousedown
    mouseup
    click
  */

 (function(window, document, Math) {
    let utils = (function(){
        return {
            hasTouch: 'ontouchstart' in window,
            getTime: Date.now || function getTime () { return new Date().getTime(); },
            addEvent: function (el, type, fn, capture) {
                el.addEventListener(type, fn, !!capture);
            },
            removeEvent: function (el, type, fn, capture) {
                el.removeEventListener(type, fn, !!capture);
            },
            getRect: function(el) {
                if(el instanceof SVGAElement) {
                    let rect = el.getBoundingClientRect();
                    return {
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height,
                    }
                } else {
                    return {
                        left: el.offsetLeft,
                        top: el.offsetRight,
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                    }
                }
            },
            offset: function(el) {
                let left = -el.offsetLeft;
                    top  = -el.offsetTop;
                while(el = el.offsetParent) {
                    left -= el.offsetLeft;
                    top -= el.offsetTop;
                }
                return {
                    left: left,
                    top: top,
                }
            },
            momentum: function (current, start, time, lowerMargin, wrapperSize, deceleration) {
                var distance = current - start,
                    speed = Math.abs(distance) / time,
                    destination,
                    duration;
        
                deceleration = deceleration === undefined ? 0.0006 : deceleration;
        
                destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
                duration = speed / deceleration;
        
                if ( destination < lowerMargin ) {
                    destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
                    distance = Math.abs(destination - current);
                    duration = distance / speed;
                } else if ( destination > 0 ) {
                    destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
                    distance = Math.abs(current) + destination;
                    duration = distance / speed;
                }
        
                return {
                    destination: Math.round(destination),
                    duration: duration
                };
            }
        }
    })();

    function TinyScroll(el) {
        this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;

        this.options = {
            // INSERT POINT: OPTIONS
            disablePointer : !utils.hasPointer,
            disableTouch : utils.hasPointer || !utils.hasTouch,
            disableMouse : utils.hasPointer || utils.hasTouch,
            startX: 0,
            startY: 0,
            scrollY: true,
            directionLockThreshold: 5,
            momentum: true,
    
            bounce: true,
            bounceTime: 600,
            bounceEasing: '',
    
            preventDefault: true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
    
            HWCompositing: true,
            useTransition: true,
            useTransform: true,
            bindToWrapper: typeof window.onmousedown === "undefined" // 什么意思
        };

        if (!this.options.useTransition && !this.options.useTransform) {
            if(!(/relative|absolute/i).test(this.scrollerStyle.position)) {
                this.scrollerStyle.position = "relative";
            }
        }

        // 这些才是一个实例的 state
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};

        // this.startTime
        // this.endTime
        // this.startX
		// this.startY
		// this.absStartX
		// this.absStartY
		// this.pointX
        // this.pointY
        // this.initiated
        // this.moved
        // this.distX
		// this.distY
		// this.directionLocked
        
        // this.wrapperWidth
        // this.wrapperHeight
        // this.scrollerWidth
        // this.scrollerHeight
        // this.maxScrollX
        // this.maxScrollY
        // this.wrapperOffset


        this._init();
        this.refresh();

        this.scrollTo(this.options.startX, this.options.startY); // with animatioin
        this.enable();
    }
    
    TinyScroll.prototype = {
        version: '0.0.1',
        _init: function() {
            this._initEvents();
        },
        refresh: function() {
            let rect = utils.getRect(this.wrapper);
            this.wrpperHeight = rect.height;
            this.wrapperWidth = rect.width;

            rect = utils.getRect(this.scroller);
            this.scrollerHeight = rect.height;
            this.scrollerWidth = rect.width;

            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            // 暂时不考虑 之滚动一个方向的情况


            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;

            this.wrapperOffset = utils.offset(this.wrapper);

            this._execEvent('refresh');

		    this.resetPosition();
        },
        _initEvents: function(remove) {
            let eventType = remove ? utils.removeEvent : utils.addEvent;
                target = this.options.bindToWrapper ? this.wrapper : window;

            // mouse event
            eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
            eventType(target, 'mouseup', this);
            
            // touch event
            eventType(this.wrapper, 'touchstart', this);
            eventType(target, 'touchmove', this);
            eventType(target, 'touchcancel', this);
            eventType(target, 'touchend', this);

            // transition end 
            eventType(this.scroller, 'transitionend', this);
        },
        _start: function(e) {},
        _move: function(e) {},
        _end: function(e) {},
        _wheel(e) {},
        _key(e) {},
        _translate(x, y) {},
        _transitionEnd: function(e) {},
        _execEvent: function(event) {
            console.log('execute event - ', event);
        },
        resetPosition(time) {
            let x = this.x;
                y = this.y;
            time = time || 0;

            if(x < this.maxScrollX) {
                x = this.maxScrollX;
            } else if( x > 0) {
                x = 0;
            }

            if(y < this.maxScrollY) {
                y = this.maxScrollY;
            } else if( y > 0) {
                y = 0;
            }

            if(x == this.x && y == this.y) {
                return false;
            }

            this.scrollTo(x, y, time, this.options.bounceEasing);
            
            return true;
        },
        destroy: function() {},
        enable: function() {},
        disable: function() {},
        scrollTo: function() {},
        handleEvent(e) {
            console.log('handle event - ', e.type);
            switch(e.type) {
                case "mousedown":
                case "touchstart":
                    this._start(e);
                    break;

                case "mousemove":
                case "touchmove":
                    this._move(e);
                    break;

                case "mousecancel":
                case "touchcancel":
                case "mouseup":
                case "touchend":
                    this._end(e);
                
                case "transitionend":
                    this._transitionEnd(e);
                    break;

                case "wheel":
                case "mousewheel":
                    this._wheel(e);
                    break;

                case "keydown":
                    this._key(e);
                    break;

                case "click":
                    e.preventDefault();
                    e.stopPropagation();
                    break;
            }
        },
    }

    TinyScroll.utils = utils;
    window.TinyScroll = TinyScroll;
 })(window, document, Math);