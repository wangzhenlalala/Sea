#include "shape.h"

int main()
{   /* direct initialization vs copy initialization 什么鬼 */
    // cannot declare variable 's' to be of abstract type 'Shape'
    // Shape *s = new Shape(); // new 是在heap上分配内存，初始化对象，然后返会给你一个指针
    Shape s();
    return 0;
}