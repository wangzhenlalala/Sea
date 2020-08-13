#include <iostream>
#include <cstdlib>
#include <ctime>

int getRandomNumber(int min, int max)
{
    static constexpr double fraction { 1.0 / (RAND_MAX + 1)};
    return min + static_cast<int>((max - min + 1) * std::rand() * fraction);
}