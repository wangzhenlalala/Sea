class samphore
{
public:
    samphore(int init): count(init)
    {

    };
    void P(void);
    void V(void);

private:
    int count; // invariant count >= 0;
};

/*
    wait for P and signal for V 
    P() : If count > 0 decrement count by one, else remove the calling process from
    execution and add it to the set of processes waiting for this semaphore.

    V() : Increment count by one. If the set of processes waiting for this semaphore is not
    empty, remove one process from the set and cause that process to resume execution.

    It is stipulated that the operations P() and V() must in indivisible in time and that count
    must be non­negative at all times.
*/

/*
    A binary semaphore whose count is restricted to the values of 0 and 1 is equivalent to a mutex  
*/