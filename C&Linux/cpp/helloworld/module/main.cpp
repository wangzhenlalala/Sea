/*
    模块化的核心是区分：interface and implementation
    declaration 代表着 interface // function, type
    definition 代表着  implementation

    seperate compilation

    Vector.h:  Vector interface
        Vector.cpp: Vector definition
        main.cpp: Vector user

    好像是不同的文件中声明/定义的函数，可以放到同一个命名空间下
*/

// #include "./Vector/Vector.h" // 可以指定路径的
#include <iostream>
#include "Vector.h" // -I./Vector/
#include <cmath>
#include <stdexcept>
#include <new>

using namespace std;
namespace hero {
    class Ironman {

    }
    void listHeros(void)
    {
        return;
    }
}

double sqrt_sum(Vector& v)
{
    double sum = 0;
    for(int i=0; i != v.size(); i++)
    {
        sum += sqrt(v[i]);
    }
    return sum;
}

int main(int argc, char** argv)
{
    int size = 0;
    try {
        Vector v = Vector(size);
    } catch(std::length_error) {
        cout << "vector length must be greater 0 \n";
        throw;
    } catch(std::bad_alloc) {
        cout << "out of memory\n";
        std::terminate();
    }
    return 0;
}