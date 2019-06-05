#include <sys/types.h> //pid_t
#include <unistd.h> //fork
#include <stdio.h> //this header file must be included ahead stdlib.h or complication will fail : (.text+0x20)：对‘main’未定义的引用
#include <stdlib.h>

int main(){
    pid_t pid;
    char* message;
    int n;
    printf("forkprogram statring!\n");
    pid = fork();
    switch(pid){
        case -1:
            fprintf(stderr, "fork failed!\n");
            exit(-1);
        case 0:
            message = "This is from child";
            n = 5;
            break;
        default: 
            message = "This is from parent";
            n = 3;
            break;
    }
    for(; n>0; n--){
        puts(message);
        sleep(1);
    }
    exit(0);
}