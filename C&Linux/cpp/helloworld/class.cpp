// The central language feature of C++ is the class. 
// A class is a user-defined type provided to rep- resent a concept in the code of a program. 
// Whenever our design for a program has a useful concept, idea, entity, etc., 
// we try to represent it as a class in the program so that the idea is there in the code, 
// rather than just in our head, in a design document, or in some comments.


/* concret class*/
class Complex {
    double re, im; // representation
public:
    Complex() :re(0), im(0) {}
    Complex(double r) :re(r), im(0) {}
    Complex(double r, double i): re(r), im(i) {}

    double real() const {return re;} // const means this function will not modify the object
    void real(double r) { re = r} // Functions defined in a class are inlined by default.

    double imag() const { return im;} // Functions defined in a class are inlined by default.
    void imag(double i) { im = i;} // Functions defined in a class are inlined by default.

    Complex& operator+=(Complex z) { // Functions defined in a class are inlined by default.
        re += z.re;
        im += z.im;
        return *this; // 终于看到this指针了
    }
    Complex& operator-=(Complex z) { // Functions defined in a class are inlined by default.
        re -= z.re;
        im -= z.im;
        return *this; // 终于看到this指针了
    }

    Complex& operator*=(Complex z); // 在外面定义这个函数
}
// + 运算符定义在这里， 就像是定义了一个普通的函数吗/？？
// 编译器会根据类型进行找到相应的对象是吗？？
// operator+ 这个函数是多态的 是吧
// 这不就是haskell里面的 typeclass 吗/？


// an argument passed by value is copied, 
// so that I can modify an argument without affecting the caller’s copy,
Complex operator+(Complex a, Complex b) { return a+= b; };
Complex operator-(Complex a, Complex b) { return a-= b; }
// Complex operator-(Complex a) { return {-a.real(), -a.imag()} };
Complex operator-(Complex a) { 
    a.real(-a.real());
    a.imag(-a.imag());
    return a;
};


/* abstract class*/
// A class with a pure virtual function is called an abstract class.
class Container {
public:
    // The word virtual means ‘‘may be redefined later in a class derived from this one.’’
    // =0 syntax says the function is [pure virtual]; 
    // that is, some class derived from Container must define the function.
    virtual double& operator[](int i) = 0;
    virtual int size() const = 0;
    virtual ~Container() {};
}

/* virtual function table */