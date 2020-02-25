
/*
In a single ­CPU system we can simply disable interrupts (and thereby a potential context switch) to
make testing and setting locked in an indivisible, or atomic operation: only one
execution of an atomic operation may be in progress at any given time
*/
namespace sys
{
    class automic
    {
    public:
        static void begin(void)
        {
            // platform specific operations to disable (or, rather, postpone) and enable interrupts
            disable_interrupts();
        }
        static void end(void)
        {
            enable_interrupts();
        }
    };
};

class mutex 
{
public:
    mutex();
    void lock();
    void unlock();

private:
    bool locked;
};
