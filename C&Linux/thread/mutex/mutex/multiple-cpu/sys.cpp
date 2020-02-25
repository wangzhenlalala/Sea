/*
 the function body is one atomic operation that guarenteed by the hardware. 
*/
bool sys::test_and_set(bool& flag)
{
    if(flag)
    {
        return true;
    } 
    else 
    {
        flag = true;
        return false;
    }
}

/**
 * 在硬件提供的automic操作的基础上，封装一个原子操作的类
 */
void sys::automic::automic(): spin(false) 
{
}

static void sys::automic::begin()
{
    while(sys::test_and_set(spin) == true)
        while(spin == true); // busy waiting
}

static void sys::automic::end()
{
    spin = false;
}

/**
 * The alert reader may now wonder whether we have actually implemented efficient
 * waiting: the nested loops making up the body of sys::atomic::begin() appear to
 * result in unmitigated busy waiting. However, for modern multi­CPU systems with a
 * per­CPU, coherent cache this implementation of a spinlock is actually very efficient.
 * Cache coherency means keeping the view of the main memory of each CPU consistent
 * despite caching. This can be achieved by snooping: essentially, hardware on each CPU
 * monitors the bus traffic between the other CPUs and the main memory and updates the
 * cache as needed. When a CPU with a local, coherent cache finds spin to be true upon
 * entry to sys::atomic::begin(), the resulting repeated reads of spin in the inner
 * while loop are satisfied from the cache, until the CPU that set spin to true sets it back
 * to false in sys::atomic::end(). As the machine instructions making up
 * sys::atomic::begin() also get cached, the waiting CPU doesn't use the bus
 * unnecessarily, and so the performance of other CPUs is not degraded. The
 * computational power of the waiting CPU is still wasted while looping and might be
 * more profitably used by switching to some other thread. However, the overhead of a
 * context switch is likely to be far greater than the average overhead of a spinlock.
 * Provided that the critical sections protected by spinlocks are kept short and few, using
 * them is an attractive solution in that it requires no special hardware; a coherent local
 * cache is desirable in any case.
*/
