#include <iostream>
using namespace std;


class Shape {
public:
    virtual Point center() const =0; // pure virtual
    virtual void move(Point to) =0;
    virtual void draw() const = 0; // draw on current "Canvas"
    virtual void rotate(int angle) = 0;
    virtual ˜Shape() {} // destructor 
    // A virtual destructor is essential for an abstract class because an object of a derived class is usually manipulated through
    // the interface provided by its abstract base class. In particular, it may be deleted through a pointer to
    // a base class. Then, the virtual function call mechanism ensures that the proper destructor is called.
    // That destructor then implicitly invokes the destructors of its bases and members.
};

class Point {
public:
    Point(double x, double y): x(x), y(y){}
    
private:
    double x;
    double y;
}

class Circle : public Shape {
public:
    Circle(Point p, int rr): x(p), rr(r); // constr uctor
    Point center() const { return x; }
    void move(Point to) { x=to; }
    void draw() const;
    void rotate(int) {} // nice simple algorithm

private:
    Point x; // center
    int r; // radius
};


class Smiley : public Circle { // use the circle as the base for a face
public:
    Smiley(Point p, int r) : Circle(p,r), mouth(NULL) { } // 调用基类的constructor就是， Circle(p, r) ????
    ˜Smiley()
    {
        delete mouth;
        for (auto p : eyes)
            delete p;
    }
    // A function in a derived class overrides a virtual function in a base class if that function has exactly the same name and type.
    void move(Point to) override; // explicit override
    void draw() const override;
    void rotate(int) override;

    void add_eye(Shape∗ s) { eyes.push_back(s); }
    void set_mouth(Shape* s);
    virtual void wink(int i); // wink eye number i

private:
    vector<Shape∗> eyes; // usually two eyes
    Shape∗ mouth; // We can [add] data members, operations, or both as we define a new class by derivation
};


void Smiley::draw()
{
    Circle::draw(); // 调用父类的方法，覆盖了父类的实现 -> 画脸
    for (auto p : eyes)
        p−>draw();
    mouth−>draw();
}

int main()
{
    Point center(2,3); // 每次去获取x,y都需要使用 public的函数吗 center.getX(), center.getY() ????
    // cout << center.x << endl; // 'double Point::x' is private within this context
}

/**
    When we design a class, we must always consider if and how an object might be copied. For
simple concrete types, memberwise copy is often exactly the right semantics for copy. For some
sophisticated concrete types, such as Vector, memberwise copy is not the right semantics for copy,
and for abstract types it almost never is.
*/