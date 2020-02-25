namespace sys
{
    /**
     *  automic
     */
    class automic
    {
    public:
        static void begin(void); // static
        static void end(void); // static
    private:
        static bool spin; // static
    };

    /**
     * thread_id
     */
    class thread_id
    {

    };

    /**
     *t hread_set
     */
    class thread_set
    {
    public:
        // a thread can be added to the set with sys::thread_set::put()
        void put(thread_id tid);
        // a previously added thread removed from the set with sys::thread_set::get()
        bool get(thread_id& tid);
    }

    /**
     * global function 
    */
    
    void suspend(); // sys::suspend() causes the calling thread to be removed from execution
    void resume(const thread_id id);
    thread_id self(void); // obtain its own thread identifier by calling sys::self()
    bool test_and_set(bool&); // test-­and-­set machine instruction
};


/**
 * mutex
 */
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
