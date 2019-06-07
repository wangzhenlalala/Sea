var Model = {
	inherited: function(){},

	created: function(){},

	prototype: {
		init: function(){}
	},

	create: function(){
		var object = Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);
		object.created();
		this.inherited(object);
		return object;
	},

	init: function(){
		var instance = Object.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance, arguments);
		return instance;
	}
};

// 添加对象属性
jQuery.extend(Model, {
	find: function(){}
});
// 添加实例属性
jQuery.extend(Model.prototype, {
	init: function(atts) {
			if (atts) this.load(atts);
			},
	load: function(attributes){
			for(var name in attributes)
			this[name] = attributes[name];
			}
});




/*********************************************************************/

var Model = {
	/* ……代码片段……*/
	extend: function(o){
		var extended = o.extended;
		jQuery.extend(this, o);
		if (extended) extended(this);
	},
	include: function(o){
		var included = o.included;
		jQuery.extend(this.prototype, o);
		if (included) included(this);
		}
	};
	// 添加对象属性
	Model.extend({
		find: function(){}
	});
	// 添加实例属性
	Model.include({
		init: function(atts) { /* ... */ },
		load: function(attributes){ /* ... */ }
	});
	现在我们可以创建新的资源并设置一些属性 ：
	var asset = Asset.init({name: "foo.png"});
}



/**************** 持久记录******************/

Model.records = {};
Model.include({
newRecord: true,
create: function(){
this.newRecord = false;
this.parent.records[this.id] = this;
},
destroy: function(){
delete this.parent.records[this.id];
}
});
Model.include({
update: function(){
this.parent.records[this.id] = this;
}
});

// 将对象存入 hash 记录中， 保持一个引用指向它
Model.include({
save: function(){
this.newRecord ? this.create() : this.update();
}
});

Model.extend({
// 通过 ID 查找， 找不到则抛出异常
find: function(id){
return this.records[id] || throw("Unknown record");
}
});

/*******************************增加ID的支持**************************/

Math.guid = function(){
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
return v.toString(16);
}).toUpperCase();
};


Model.extend({
	created: function(){
	this.records = {};
	}
});


// 向 ORM 中添加记录
// 向 ORM 中添加数据非常简单。 我们只需从服务器抓取数据并更新模型的记录即可。 现
// 在给 Model 对象增加 populate() 函数， 它会对任何给定的值做遍历、 创建实例并更新
// records 对象 ：
Model.extend({
populate: function(values){
// 重置 model 和 records
this.records = {};
for (var i=0, il = values.length; i < il; i++) {
var record = this.init(values[i]);
record.newRecord = false;
this.records[record.id] = record;
}
}
});
// 现在我们可以使用 Model.populate() 函数， 传入请求的返回数据 ：
jQuery.getJSON("/assets", function(result){
Asset.populate(result);
});
// 这样任何从服务器返回的记录都会同步到我们的 ORM 中了。

// 序列化并保存一个对象
localStorage.setItem("seriData", JSON.stringify(object));
// 读取并将 JSON 转换为对象
var result = JSON.parse(localStorage.getItem("seriData"));