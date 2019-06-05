#include <unistd.h>
#include <stdio.h>
#include <signal.h>

void ouch(int sig){
    printf("i receive signal %d\n", sig);
}

int main(){
    struct sigaction act;
    act.sa_handler = ouch;
    sigemptyset(&act.sa_mask);
    act.sa_flags = 0;

    sigaction(SIGINT, &act, NULL);

    while(1){
        printf("lalal i am here\n");
        sleep(1);
    }
}