#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

#define BUFSIZE 1024
#define PERMS 0666

int main(int argc, char **argv){
    int tarFd, souFd;
    int n = 0;
    char BUF[BUFSIZE];

    if(argc != 3){
        printf("Usage copy a to b");
        return -1;
    }
    if( (souFd = open(argv[1], O_RDONLY, 0)) == -1){
        printf("Error can't open file %s\n", argv[1]);
        return -1;
    }
    if( (tarFd = creat(argv[2], PERMS)) == -1){
        printf("Error can't create file %s with permission %03o\n", argv[2], PERMS);
        return -2;
    }
    while( (n = read(souFd, BUF, BUFSIZE)) > 0 )
    {
        if( write(tarFd, BUF, BUFSIZE) != n){
            printf("Error can't write to file\n");
            return -3;
        }
    }
    return 0;
}