#include <iostream>
#include <thread>

using namespace std;


class counter 
{
public:
    counter(int i): count(i) {};

    // copy constructor
    counter(const counter& right)
    {
        // 需要注意的是，C++ 中的类成员访问控制，是建立在「类」这个层面的，而不是「对象」这个层面的。
        // 这也就是说，你可以在一个实例中访问同一个类的不同实例当中的私有变量。
        count = right.count;
    }

    // copy assignment
    counter& operator=(const counter& right)
    {
        count = right.count;
        return *this;
    }
    // copy constructor is implicitly deleted because 'counter' has a user-declared move constructor counter(const counter&& right
    // move constructor
    /**
     * A move constructor does not take a const argument: after all, a move constructor is supposed to
     * remove the value from its argument. A move assignment is defined similarly.
     * A move operation is applied when an rvalue reference is used as an initializer or as the righthand side of an assignment.
     * After a move, a moved-from object should be in a state that allows a destructor to be run. Typically, we should also allow assignment to a moved-from object.
     * Where the programmer knows that a value will not be used again, but the compiler can’t be
     * expected to be smart enough to figure that out, the programmer can be specific
     */
    /**
     * The standard-library function move() returns doesn’t actually move anything. Instead, it returns a
     * reference to its argument from which we may move – an rvalue reference.
     */
    counter(counter&& right)
    {
        count = right.count;
    }

    counter& operator=(counter&& right)
    {
        count = right.count;
        return *this;
    }

    void update()
    {
        count += 1;
    }
    int get()
    {
        return count;
    }
private:
    int count;
}; // expected ';' after class

void updateCounter(counter& c)
{
    c.update();
    cout << "thread id is :" << std::this_thread::get_id() << endl;
    return;
}; // expected ';' after top level declarator

int main()
{
    counter c{20};
    // counter& r = c;
    // 线程初始化后立即执行 线程函数 
    // 传入线程函数的参数必须是引用类型的
    // thread::thread<void (&)(counter &), counter &, void>
    std::thread t{updateCounter, std::ref(c)};
    t.join(); //确保主线程在子线程退出之后才退出。
    cout << "in main thread count is: " << c.get() << endl;
    return 0;
}