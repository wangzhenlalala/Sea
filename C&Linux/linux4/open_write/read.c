#include <fcntl.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

int main(){
    int filedes = 0;
    FILE *toRead = 0;
    char buf[10];
    filedes = open("./number.txt",O_RDONLY);
    read(filedes,buf,5);
    printf("read: %s\n",buf);
    toRead = fopen("./number.txt","r");
    fgets(buf,5,toRead);
    printf("fread: %s\n",buf);
    return 0;
}
