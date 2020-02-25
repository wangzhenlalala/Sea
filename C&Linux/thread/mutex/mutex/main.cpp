#include "./mutex.h"

int main()
{
    mutex m;
    m.lock();
    // critical section
    
    m.unlock();
}