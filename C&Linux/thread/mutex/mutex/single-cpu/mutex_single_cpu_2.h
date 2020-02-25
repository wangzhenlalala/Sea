
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

    class thread_id
    {

    };

    class thread_set
    {
    public:
        // a thread can be added to the set with sys::thread_set::put()
        void put(thread_id tid);
        // a previously added thread removed from the set with sys::thread_set::get()
        bool get(thread_id& tid);
    }

    // sys::suspend() causes the calling thread to be removed from execution
    void suspend();
    void resume(const thread_id id);
    // obtain its own thread identifier by calling sys::self()
    thread_id self(void);
};

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
