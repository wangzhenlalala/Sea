#include "Vector.h"
#include <stdexcept>

Vector::Vector(int s) // constructor: acquire resources
{
    if(s < 0)
        throw std::length_error("length must be positive");
    elem = new double[s];
    for(int i=0; i<s; i++) // // initialize elements
    {
        elem[i] = 0;
    }
    sz = s;
}

Vector::~Vector() // destructor: release resources
{
    delete[] elem; // delete[] 这都是什么语法啊！！！
}

// copy constructor
Vector& Vector::Vector(Vector& a)
    :elem(new double[a.sz]), sz(a.sz)
{
    for(int i=0; i<sz; i++)
    {
        elem[i] = 0.0;
    }
}

// 类型转换
Vector::Vector(int s)
    :elem(new double[s]), sz(s)
{

}
// copy assignment
Vector& Vector::operator=(Vector& a)
{
    delete[] elem;
    sz = a.sz;
    elem = new double[a.sz];
    for(int i=0; i<sz; i++)
    {
        elem[i] = a.elem[i];
    }
    return *this;
}

double& Vector::operator[](int i)
{
    return elem[i];
}

int Vector::size()
{
    return sz;
}

// class object 和 普通类型的 variable一样
// 当进入他的scope的时候，被创建，执行 constructor，分配资源
// 当离开他的scope的时候，被销毁，执行 destructor, 我们可以在这里释放该对象拥有的资源
// 这样 class object的使用者，就不用过多的操心资源的分配和释放了
// 将对象的资源和对象的生命周期挂在一起！！！


// Avoiding naked new and naked delete makes code far less error-prone a
// nd far easier to keep free of resource leaks

/*
Before resorting to garbage collection, systematically use resource handles: Let each resource
have an owner in some scope and by default be released at the end of its owners scope. In C++,
this is known as RAII (Resource Acquisition Is Initialization) and is integrated with error handling
in the form of exceptions. Resources can be moved from scope to scope using move semantics or
‘‘smart pointers,’’ and shared ownership can be represented by ‘‘shared pointers’’ (§11.2.1).
*/