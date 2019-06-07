## __metaclass__ = type ## when you use python2

class Person:
    ## class body can include any statements and expression

    ##foo.age is ok  static attr
    ##foo.__age is ok  static attr
    ##foo._Person__age is ok
    __age = 25 ## static attribute
    age = 0  ## static attribute
    def set_name(self, name):
        ## outside foo.__name is not ok
        ## outside foo._Person__name is ok
        self.__name = name
    def get_name(self):
        return self.__name
    def greet(self):
        print("Hello, world! I'm {}".format(self.name))
    def __howOld(self):
        print("I'm {} years old".format(self.__age))

foo = Person() ##不需要new 关键字
bar = Person()
foo.set_name('foo_foo')
bar.set_name('bar_bar')
foo.greet()
## 可以通过 foo.name 取值；可以通过foo.name = 'other'赋值 ！！！！
##同一个模块再次import后， 会再次运行该模块吗

##类的静态属性，可以为所有的实例所读共享， 一旦某个实例去修改类的静态属性，那么该属性就会被复制到该实例的属性中
