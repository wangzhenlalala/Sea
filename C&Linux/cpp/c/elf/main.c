#include <stdio.h>
#include "./out.h"

extern double whocares[];
char company[] = "china hefei";
double age = 2.89;
double* p_age = &whocares[3];

double add(int* left, int* right) {
    return *left + *right;
}

int main () {
    int name  = 5;
    printf("hello world");
    int a = 3;
    int b = 4;
    double result = add(&a, &b);
    return 0;
} 