#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
    std::srand( static_cast<unsigned int>(std::time(nullptr)));
    std::cout << "hello world" << std::endl;
    cout << "max random number is: " << RAND_MAX << endl;
    return 0;
}