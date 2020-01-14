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
                if(capture === undefined) {
                    capture = false;
                }
                el.addEventListener(type, fn, capture);
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
                        top: el.offsetTop,
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
            getComputedPosition: function(ele) {
                let style = window.getComputedStyle(ele, null);
                // 通过transform： translate(x, y);的transition，ele上是具有实时的translate的位置的
                // matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1)
                // matrix(a, b, c, d, tx, ty)
                // "matrix(1, 0, 0, 1, 0, -759) 没有单位
                let matrix = style.transform,
                    x,y;
                matrix = matrix.split(")")[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
                return {x: x, y: y};
            },
            eventType: {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,

                mousedown: 2,
                mousemove: 2,
                mouseup: 2,

            },
            ease: {
                circular: {
                    style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
                    fn: function (k) {
                        return Math.sqrt( 1 - ( --k * k ) );
                    }
                },
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


        this._init();     // 绑定事件
        this.refresh();   // 重新设置实例的状态

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
            this.wrapperHeight = rect.height;
            this.wrapperWidth = rect.width;

            rect = utils.getRect(this.scroller);
            this.scrollerHeight = rect.height;
            this.scrollerWidth = rect.width;

            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            // 暂时不考虑 之滚动一个方向的情况

            this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;
            
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
            eventType(this.wrapper, 'touchstart', this, {passive: false, capture: false});
            eventType(target, 'touchmove', this, {passive: false, capture: false});
            eventType(target, 'touchcancel', this, {passive: false, capture: false});
            eventType(target, 'touchend', this, {passive: false, capture: false});

            // transition end 
            eventType(this.scroller, 'transitionend', this);
        },
        _start: function(e) {
            // 一上来就监听了move事件，如果没有经历过start事件，是不能移动的。
            if(this.initiated) return;
            e.preventDefault(); // prevent browser default scroll;
            this.startX = this.x;
            this.startY = this.y;
            this.startTime = utils.getTime();
            this.moved = false;
            this.initiated =  utils.eventType[e.type];
            
            console.log('------ start --')
            // 如果已经在transition当中了，应该停止当前的动画。
            if(this.isInTransition) {
                this.isInTransition = false;
                this.scrollerStyle.transitionDuration = 0;
                let pos = utils.getComputedPosition(this.scroller);
                this._translate(pos.x, pos.y);
                this._execEvent('scrollEnd');
            }
            let point = e.touches ? e.touches[0] : e;
            this.pointX = point.pageX; // 选择pageX的原因 ？？？？
            this.pointY = point.pageY;
        },
        _move: function(e) {
            if(!this.initiated || this.initiated !== utils.eventType[e.type]) return;
            e.preventDefault();
            
            let point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY,
                newX, newY;

            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll   ? deltaY : 0;

            if(Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                this.moved = true;
            }
            // console.log('--- move ---', newY);
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            newX   = this.x + deltaX;
            newY   = this.y + deltaY;
            // 移动的过程中，如果两边超出了边界(boundary)
            if(newX > 0 || newX < this.maxScrollX) {
                newX = this.options.bounce 
                                ? this.x + deltaX / 3
                                : newX > 0
                                    ? 0
                                    : this.maxScrollX; 
            }

            if(newY > 0 || newY < this.maxScrollY) {
                newY = this.options.bounce 
                                ? this.y + deltaY / 3
                                : newY > 0
                                    ? 0
                                    : this.maxScrollY; 
            }
            console.log('-- move --', utils.getTime() - this.startTime);
            this._translate(newX, newY);
            this.startTime = utils.getTime();
            
            
        },
        _end: function(e) {
            if(!this.initiated || this.initiated !== utils.eventType[e.type]) return;
            e.preventDefault();

            let point  = e.changedTouches ? e.changedTouches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY,
                newX   = this.x + deltaX,
                newY   = this.y + deltaY,
                now    = utils.getTime(),
                momentumX,
                momentumY,
                time,
                duration = now - this.startTime;

            if(!this.moved) {
                // 可以触发一个tap/click事件
                // return;
            };
            
            this.initiated = 0;
            this.moved = false;
            this.endTime = now;  // 为什么要设置endTime
            this.isInTransition = false;

            // 松开的时候，有可能是超出边界(boundary); 如果超出边界，最终的位置就在边界的地方，但是需要一个反弹的动画
            if( this.resetPosition(this.options.bounceTime) ) {
                return;
            };
            momentumY = utils.momentum(newY, this.y, duration, this.maxScrollY, this.wrapperHeight);
            momentumX = utils.momentum(newX, this.x, duration, this.maxScrollX, this.wrapperWidth);
            time = Math.max(momentumX.duration, momentumY.duration);
            console.log('-- end -- y, duration', momentumY.destination, time);
            this.scrollTo(momentumX.destination, momentumY.destination, time, utils.ease.circular.style);
        },
        _wheel(e) {},
        _key(e) {},
        _translate(x, y) {
            // x = Math.round(x);
            // y = Math.round(y);
            this.scrollerStyle['transform'] = `translate(${x}px, ${y}px) translateZ(0px)`;
            this.x = x;
            this.y = y;
        },
        _transitionEnd: function(e) {
            if(e.target !== this.scroller || !this.isInTransition) { // 要判断是否处在tranition当中
                console.log('transition return branch', this.isInTransition)
                return;
            }
            console.log('-- transition end --');
            this.scrollerStyle.transitionDuration = 0;
            if(!this.resetPosition()) {
                this.isInTransition = false;
                this._execEvent('scrollEnd');
            };
        },
        _execEvent: function(event) {
            console.log('execute event - ', event);
        },
        resetPosition(time) {
            // 停止滚动的动画，设定其当前的位置,
            // 如果当前的位置，不在合法的位置，调整到合适的位置
            let x = this.x;
                y = this.y;
            time = time || 0;

            if(x < this.maxScrollX) {
                x = this.maxScrollX;
            } else if( x > 0 || !this.hasHorizontalScroll) {
                x = 0;
            }

            if(y < this.maxScrollY) {
                y = this.maxScrollY;
            } else if( y > 0 || !this.hasVerticalScroll) {
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
        scrollTo: function(x, y, duration, easing) {
            // console.log('scroll to duration', duration);
            this.isInTransition = duration > 0;
            this.scrollerStyle.transitionDuration = duration  + 'ms';
            this.scrollerStyle.transitionTimingFunction = easing;
            this._translate(x, y);
        },
        handleEvent(e) {
            // console.log('handle event - ', e.type);
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