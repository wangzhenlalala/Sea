#include "./mutex.h"

mutex::mutex(void): locked(false)
{

};

void mutex::lock()
{
    /* 
    it may happen that two (or more) threads enter lock() sufficiently simultaneously that they all find locked false
    and proceed to set it true, in which case mutual exclusion is not achieved
    */
    // waiting is implemented as a busy waiting loop.
    while(locked);
    locked = true;
};

void mutex::unlock()
{
    
};
class mutex
{
public:
    mutex():locked(false)
    {

    };

    void lock() 
    {
        /* 
        it may happen that two (or more) threads enter lock() sufficiently simultaneously that they all find locked false
        and proceed to set it true, in which case mutual exclusion is not achieved
        */
        // waiting is implemented as a busy waiting loop.
        while(locked);
        locked = true;
    }

    void unlock()
    {
        locked = false;
    }

private:
    bool locked;
}