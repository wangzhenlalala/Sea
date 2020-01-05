#include <iostream>

// use defined type

// struct
struct VectorStruct {
    int sz;
    double* ele;
}; // 分号是必须的

VectorStruct vs; // 不需要 struct Vector v;

void vector_init(VectorStruct& v, int s)
{
    v.ele = new double[s]; // 用 new double来分配内存
    v.sz = s;
}

// class
class Vector {
    public:
        Vector(int s): ele(new double[s]), sz(s) { // initializer list 还不能用{s}

        } // 每个函数后面，都没有分号
    
        double& operator[](int i) 
        {
            return ele[i];
        }

        int size()
        {
            return sz;
        }
    private:
        double* ele; // 这里需要逗号
        int sz;

};

Vector v(6); // 都不用加new的吗  Vector v = new Vector(6);


// enumeration // represent small sets of integer values
enum class Color { 
    red, // enumerator
    blue, // they are scoped
    green, // they are NOT integer
}; // scoped enumerations are a C++11 extension [-Wc++11-extensions]

Color col = Color::red;

enum Traffic_lignt { // 没有class，plain enum，
    RED,  // enumerator is not scoped, they are at the same scope as Traffic_lignt
    BLUE, // enumerator is integer RED == 0； Blue == 1
    GREEN,
};

int red = RED; // 0 
int main()
{
    return 0;
}