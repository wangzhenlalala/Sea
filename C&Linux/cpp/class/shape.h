/*
    抽象类： 含有pure virtual function的类， virtual type func() = 0;
    不能从抽象类构建实例
    但是如果没有 =0 的约束，那么，就不是抽象类，是可以从其构建实例的

    以下是个人的猜想
    所以， 抽象类作为interface的存在，也是可以不被继承者遵守的
    =0 可以让编译器严格保证继承者遵守接口

*/
/**************************************** Shape *****************************/
class Shape {
public:
    Shape(); // constructor 不需要是 虚的吗？？
    virtual ~Shape(); // 这里是不是需要 {}， 函数body
    Shape(const Shape&) =delete; // no copy operations
    Shape& operator=(const Shape&) =delete;
    Shape(Shape&&) =delete; // no move operations
    Shape& operator=(Shape&&) =delete;
    
    virtual Point center() const = 0;
    virtual void move(Point to) = 0;
    virtual void draw() const = 0;
    virtual void rotate(double angle); // it will mutate state
};



/**************************************** Point *****************************/
class Point
{
public:
    Point();
private:
    int x;
    int y;
}




/**************************************** Circle *****************************/
/
class Circle: public Shape
{
public:
    Circle(Point c, int radius);
    ~Circle();

    Point center() const;
    void move(Point to);
    void draw();
    void rotate(double angle);
private:
    Point c;
    int radius
}