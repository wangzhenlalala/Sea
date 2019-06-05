#include <stdlib.h>
#include <stdio.h>

int main(){
    printf("Running ps with system\n");
    //the current process will wait until the system call exit with exit code
    //and the system call user a new shell to start the desired program,
    system("ps -l");
    //system("ps -l &");
    printf("Done\n");
    return 0;
}