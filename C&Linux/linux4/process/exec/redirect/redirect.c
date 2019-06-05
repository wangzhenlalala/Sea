#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char**argv){
    char* filename;
    if(argc != 2){
        fprintf(stderr, "usage: only file name\n");
        exit(1);
    } 
    filename = argv[1];
    freopen(filename, "r", stdin);
    execlp("./upper","upper", (char*)0);

    //if execlp succeed, the left code will not execute, because they are replaced by the code of ./upper!!!!
    printf("execute upper error\n");
    exit(2);
}