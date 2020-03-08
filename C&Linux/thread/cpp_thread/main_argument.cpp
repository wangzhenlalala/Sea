#include <iostream>
#include <thread>

/**
 * 向线程执行函数传递参数：
 *  1. variable
 *  2. pointer
 *  3. reference
 */

/**
 * 线程执行函数
 *  1. free function
 *  2. class member function (第一个参数要是该类的一个对象)
 *      std::thread th (ClassName::memberFunc( &ClassObject, arguments... ))
*/

int work_variable(int x)
{
    // 传递个线程启动函数的参数是value copy
    // 拷贝到std::this_thread::get_id()线程的stack中
    std::cout << "------ thead: pass argument by [variable] --------";
    std::cout << "\t argument ++ is: " << ++x << std::endl;
    std::cout << std::endl << std::endl;
    return 0;
}


int work_pointer(int* px)
{
    // 传递个线程启动函数的参数是value copy
    // 拷贝到std::this_thread::get_id()线程的stack中
    std::cout << "------ thead: pass argument by [pointer] --------";
    std::cout << "\t argument ++ is: " << (++*px) << std::endl;
    std::cout << std::endl << std::endl;
    return 0;
}


int work_reference(int& x)
{
    // 传递个线程启动函数的参数是value copy
    // 拷贝到std::this_thread::get_id()线程的stack中
    std::cout << "------ thead: pass argument by [reference] --------";
    std::cout << "\t argument ++ is: " << ++x << std::endl;
    return 0;
}

class DummyClass 
{
public:
    DummyClass()
    {
        count = 30;
    }
    ~DummyClass()
    {

    }
    int addBy(int nu)
    {
        // 如果被多个线程执行，会发生 race contidion
        std::cout << std::endl;
        std::cout << count << " add " << nu << " is ";
        count += nu;
        std::cout << count << std::endl;
        return count;
    }
private:
    int count;
};

int main() 
{
    int count = 20;
    int *p_count = &count;
    int &r_count = count;

    std::cout << "----------main--- before main: " << count << std::endl;
    std::thread worker_1(work_variable, count);
    // std::thread worker_1(work_pointer, p_count);
    // std::thread worker_1(work_reference, r_count); // compile error
    // std::thread worker_1(work_reference, std::ref(count));
    worker_1.join();
    std::cout << "----------main--- after main: " << count << std::endl;

    DummyClass dummy_object{};
    std::thread thread_member( &DummyClass::addBy, &dummy_object, count);
    thread_member.join();

    return 0;
}