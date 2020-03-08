#include <iostream>
#include <thread>

using std::cout;
using std::endl;

int work_1() {
    cout << "worker 1 id is: " << std::this_thread::get_id() << endl;
    return 0;
}

int work_main() {
    cout << "main id is: " << std::this_thread::get_id() << endl; 
    return 0;
}

class ThreadRAII 
{
    std::thread & m_thread;
public:
    ThreadRAII(std::thread & threadObject)
        :m_thread(threadObject)
    {

    }
    ~ThreadRAII()
    {
        if(m_thread.joinable())
        {
            m_thread.detach(); // the thread object couble be deleted, and the thread of execution can still run
        }
    }
};

int main()
{
    std::thread thread_worker_1(work_1);
    ThreadRAII wrapped_worker1{thread_worker_1};

    cout << "main start a thread: " << thread_worker_1.get_id() << endl;
    work_main();
    // if(thread_worker_1.joinable() )
    // {
    //     thread_worker_1.join(); // any thread can wait other thread to finish. 
    // }
    cout << "main exited" << endl;
    return 0;
}