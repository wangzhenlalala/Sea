#include "./mutex_2.h"

mutex::mutex(void): locked(false)
{

};
// mutex 用来保证多个执行实体对 共享资源的 互斥操作。
// 但是mutex本身也是共享的资源， 也需要被互斥的操作
// 原子操作 保证了 对mutex本身的 互斥操作

void mutex::lock()
{
    sys::automic.begin();
    while(locked == true)
    {
        // busy waiting !!!
        // these two make it possible to let other threads get cpu
        // enabling and then immediately disabling interrupts in the wait loop 
        // makes it possible to snatch the CPU away by an interrupt.
        sys::automic.end();
        sys::automic.begin();
    };
    locked = true;
    sys::automic.end();
};

void mutex::unlock()
{
    locked = false;
};

/*
    this is only suitable for single CPU that use interrupt and time-sharing methods to implement multi-task
*/