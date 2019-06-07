           if(!Object.create)
                Object.create=function(obj){
                    function Constructor(){};
                    Constructor.prototype = obj;
                    return new Constructor();
                }
            ;
/*******************************************************************************************
                                        Model 模型部分
*********************************************************************************************/
            //为一个记录生成一个ID 
            Math.guid = function(){
              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                  }).toUpperCase();      
            };

            var Model ={
                included:function(){},
                created:function(){},
                prototype:{
                    init:function(){}
                },

                // 我们应该我一个 “类” 设置prototype，一个“对象“自动拥有__proto__属性
                create:function(){
                    var subClass = Object.create(this);
                    subClass.parent = this;
                    subClass.prototype=subClass.fn=Object.create(this.prototype);
                    this.created();
                    return subClass;
                },

                init:function(){
                    // 我们没有为instance定义prototype属性，他就没有prototype属性。而具有__proto__属性，去回溯原型链；
                    var instance = Object.create(this.prototype);
                    instance.parent=this;
                    instance.init.apply(instance,arguments);
                    return instance;
                },
                // 为我们的新类，添加属性时，在extended：function() 中，可以为类添加额外的属性。
                //这些属性为这个新类所有，相当于在创建完新类后，调用了新类的extend方法。
                extend:function(obj){
                    var extended = obj.extended;
                    jQuery.extend(this,obj);
                    if(extended) extended(this);
                },

                include:function(obj){
                    //这里的扩充，在类 和 实例中都可以访问的到。
                    var included  = obj.included;
                    jQuery.extend(this.prototype,obj);
                    if(included) included(this);
                },

            }

            //Model.records={}; //这个records是被所有的，新类所共有的，

            //通过Model。include所添加的属性，可以被所有的实例继承的，如果某个具体的实例，想
            //拥有一些自己的 新属性，他可以调用自己的init（），如user.init({});当然也可以自己
            //jQuery.extend（user,{}）,这里只是把它封装成了一个函数，来重用。。。

            Model.include({
                newRecord:true,
                //create ,并不是创建一个新的实例，实际上此时实例已经被创建，我们只是在父类的
                //records中为他留下一个记录项而已
                create:function(){
                    this.newRecord=false;
                    if(!this.id) this.id=Math.guid();
                    this.parent.records[this.id]=this.dup();
                },

                destroy:function(){
                    delete this.parent.records[this.id];
                },
                update:function(){
                    this.parent.records[this.id]=this.dup();
                },
                save:function(){
                    this.newRecord ? this.create() : this.update();
                },
                init:function(attrs){
                    if(attrs) this.load(attrs);
                },
                load:function(attrs){
                    for(var item in attrs)
                        this[item] = attrs[item];
                },
                dup:function(){
                   
                    return $.extend(true,{},this);
                },
                attributes:function(){
                    var re = {};
                    for(var it in this.parent.attributes){
                        var index = this.parent.attributes[it];
                        re[index] = this[index];
                    }
                    re["id"] = this.id;
                    return re;
                },
                toJSON:function(){
                    return this.attributes();
                }
            });

            Model.extend({
                find:function(id){
                    if(this.records[id]){
                        var rec = this.records[id];
                        return rec.dup();
                     }
                     else 
                        throw "bad id";
                    },
                created:function(){     //
                    this.records={};
                    this.attributes=[];
                },
                saveLocal:function(name){
                    var re = [];
                    for(var it in this.records){
                        re.push(this.records[it].attributes());
                    }
                    localStorage[name] = JSON.stringify(re);
                },
                loadLocal:function(name){
                    var records = JSON.parse(localStorage[name]);
                    this.populate(records);
                },
                populate:function(values){
                    this.records={};
                    for(var i =0;i<values.length;i++){
                        var temp = this.init(values[i]);
                        temp.newRecord = false;
                        this.records[temp.id] = temp.dup();
                    }
                }
            });



 /*******************************************************************************************
                                        Controler 控制器部分
*********************************************************************************************/
(function($,exports){
    var mod = function(includes){
        if(includes) this.include(includes);
    };

    mod.fn = mod.prototype;
    mod.fn.include = function(includes){
        $.extend(this,includes);
    };
    mod.fn.proxy = function(func){
        return $.proxy(func,this);
    };
    mod.fn.load = function(func){
        $(this.proxy(func));
    };
    exports.Controler = mod;
})(jQuery,window);