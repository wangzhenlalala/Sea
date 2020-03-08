#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

class Application
{
public:
    Application()
        :m_bDataLoaded(false)
    {
    }
    bool isDataloaded()
    {
        return m_bDataLoaded;
    }
    void mainTask()
    {
        while (true)
        {
            // 消费者
            // m_dataLock.lock();
            // while(m_bDataLoaded != true)
            // {
            //     m_dataLock.unlock();
            //     std::this_thread::sleep_for(std::chrono::milliseconds(100));
            //     m_dataLock.lock();
            // }
            std::unique_lock<std::mutex> u_lock(m_dataLock); // unique_lock是什么东东
            m_condVar.wait( u_lock, std::bind(&Application::isDataloaded, this) );

            // process data
            std::cout << "process data begin" << std::endl;
            m_bDataLoaded = false;
            std::cout << "process data end" << std::endl;
            // m_dataLock.unlock();
        }
    }

    void loadData()
    {
        // 生产者
        while(true) {   
            // 生产者也需要去修改共享变量，去获取锁；
            // 他如何应用 条件变量来避免忙等查询     
            m_dataLock.lock();
            while(m_bDataLoaded != false)
            {
                m_dataLock.unlock();
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
                m_dataLock.lock();
            }
            // process data
            std::cout << "--------- load data begin" << std::endl;
            m_bDataLoaded = true;
            std::cout << "--------- load data end" << std::endl;
            m_condVar.notify_one();
            m_dataLock.unlock();

        }
    }

private:
    bool m_bDataLoaded;
    std::mutex m_dataLock;
    std::condition_variable  m_condVar;
};


int main()
{
    Application app;
    std::thread mainTask(&Application::mainTask, &app);
    std::thread loadTask(&Application::loadData, &app);
    mainTask.join();
    loadTask.join();
    return 0;
}