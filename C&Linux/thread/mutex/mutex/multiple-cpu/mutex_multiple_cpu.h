#include "sys.h"

class mutex 
{
public:
    mutex();
    void lock();
    void unlock();

private:
    bool locked;
    sys::thread_set waiting;
};
