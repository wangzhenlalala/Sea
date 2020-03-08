#include <iostream>
#include <thread>

class Application
{
public:
    Application()
        :m_bDataLoaded(false)
    {
    }

    void mainTask()
    {
        while (true)
        {
            m_dataLock.lock();
            while(m_bDataLoaded != true)
            {
                m_dataLock.unlock();
                std::this_thread::sleep_for(std::chrono::milliseconds(100));
                m_dataLock.lock();
            }
            // process data
            std::cout << "process data begin" << std::endl;
            m_bDataLoaded = false;
            std::cout << "process data end" << std::endl;
            m_dataLock.unlock();
        }
    }

    void loadData()
    {
        while(true) {        
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
            m_dataLock.unlock();
        }
    }

private:
    bool m_bDataLoaded;
    std::mutex m_dataLock;
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