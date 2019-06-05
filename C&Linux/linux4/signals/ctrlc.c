#include <stdio.h>
#include <signal.h>
#include <stdlib.h>
#include <unistd.h> //sleep

void ouch(int sig){
    printf("hi you gave me ctrl-c\n");
    (void) signal(SIGINT, SIG_DFL); //pay attention is not SIGDFL ,is SIG_DFL has an underscore within betwwwn..
}

int main(){

    (void) signal(SIGINT, ouch);
    while(1){
        printf("hello\n");
        sleep(1);
    }
    exit(0);
}