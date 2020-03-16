#include <iostream> // import the declarations of io library
using namespace std; // make names from std visible without std::

double square(double x)
{
    return x*x;
}

// function overloading
void print_square(string) {
    cout << "sorry must be a number\n";
}

void print_square(double x)
{
    cout << "the square of " << x << " is " << square(x) << "\n";
}

// types and sizeof opeartorn sizeof(int) or sizeof(1)
// bool char int double unsigned

// arithmatic opeartor + - * / %
// comparsion opeartor: ==, !=, <, >, >=, <=
// logical opeartor: &&, ||, !
// bitwise opeartor: &, |, ~, ^


// scope
// local scope: destroyed when function exited
// class scope
// namespace scope: when program exit
// an object created by new lives until destroyed by delete !!!

// constants , immutability
const int a = 17;

// pointers 
char chs[6] = "hello"; // "hello" with an implicit '\0' at the end;
char chs2[6] = {'h', 'e', 'l', 'l', 'o'};
char* p = &chs[3];

// reference 
char& r = *p;
char* n = nullptr; // 新的吗
int* ip = NULL;

int main() 
{
    double d = 3.14;
    int i = 3;
    if(d > i) { 
        // with assignment and arithmetic opeartion
        // cpp perform implict type conversion 
        i = d / 3;
        cout << "greater" << endl;
    }
    // << is an operator('put to')
    print_square(3.14);
    print_square("not a number");
}