#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

using namespace std::chrono; // 加分号

/************* Wallet ************/
class Wallet
{
public:
    virtual int getMoney() const = 0; // 不需要{}; 基类和子类的声明必须一致， const 修饰符也必须同有同无
    virtual void addMoney(int money) = 0;
};

class Wallet_Lockless: public Wallet
{
public:
    Wallet_Lockless(int money=0): m_money(money)
    {
    }
    ~Wallet_Lockless()
    {
    }

    int getMoney() const
    {
        return m_money; 
    }
    void addMoney(int money)
    {
        for(int i=0; i<money; i++)
        {
            m_money++;
        }
    }

private:
    int m_money;

};

class Wallet_Locked: public Wallet
{
public:
    Wallet_Locked(int money=0): m_money(money)
    {
    }
    ~Wallet_Locked()
    {
    }

    int getMoney() const
    {
        return m_money; 
    }
    void addMoney(int money)
    {
        std::lock_guard<std::mutex> lock_gurad(money_lock); // In constructor it locks the mutex
        for(int i=0; i<money; i++)
        {
            // If some exception occurs at this point then destructor of lock_gurad will be called due to stack unwinding.
            m_money++;
        }
        // Once function exits, then destructor of lock_gurad Object will be called.
        // In destructor it unlocks the mutex.
    }

private:
    int m_money;
    std::mutex money_lock;

};
/************* TimeTester ************/
class TimeTester
{
public:
    TimeTester()
    {
    }

    ~TimeTester()
    {
    }

    void start()
    {
        start_point = std::chrono::high_resolution_clock::now();
    }

    void end()
    {
        end_point = std::chrono::high_resolution_clock::now();
    }

    int duration()
    {
        // 此类无法工作，暂时不知道为什么。
        // 之后再研究
        auto int_ms = std::chrono::duration_cast<std::chrono::milliseconds>(end_point - start_point);
        return int_ms.count(); // 毫秒数
    }

private:
    std::chrono::high_resolution_clock::time_point start_point;
    std::chrono::high_resolution_clock::time_point end_point;
};

void parallelTask(Wallet *pWallet)
{
    // std::cout << "before add money is: " << wallet.getMoney() << std::endl;
    std::vector<std::thread> threads;
    for(int i=0; i<5; i++)
    {
        threads.push_back( std::thread(&Wallet::addMoney, pWallet, 1000) );
    }

    for(int i=0; i<threads.size(); i++)
    {
        threads.at(i).join();
    }
    std::cout << "after add money is: " << pWallet->getMoney() << std::endl;
}
/************* main ************/

int main()
{
    Wallet_Lockless wallet_lockless{};
    Wallet_Locked wallet_locked{};
    for(int i=0; i<20; i++)
    {
        parallelTask(&wallet_locked);
    }
    return 0;
}