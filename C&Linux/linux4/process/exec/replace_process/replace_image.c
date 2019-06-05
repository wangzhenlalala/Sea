#include<unistd.h> //exec
#include<stdio.h>
#include<stdlib.h>  //exit

int main(){
    printf("Running ps width execlp\n");
    execlp("/bin/ps", "ps", "-l", (char*)0);
    printf("Done\n");
}