#include "./mutex.h"

mutex::mutex(void): locked(false)
{
    sys::thread_set waiting();
};

mutex::~mutex(void)
{
}
// mutex 用来保证多个执行实体对 共享资源的 互斥操作。
// 但是mutex本身也是共享的资源， 也需要被互斥的操作
// 原子操作 保证了 对mutex本身的 互斥操作

void mutex::lock()
{
    sys::automic.begin();
    while(locked == true)
    {
        waiting.put(sys::self());
        // to solve busy waiting
        sys::suspend();
        sys::automic.begin();
    };
    locked = true;
    sys::automic.end();
};

void mutex::unlock()
{
    sys::thread_id next;

    sys::automic.begin();
    locked = false;
    if(waiting.get(next) == true)
    {
        sys::resume(next);
    }
    sys::atomic.end()
};

/*
    this is only suitable for single CPU that use interrupt and time-sharing methods to implement multi-task
*/