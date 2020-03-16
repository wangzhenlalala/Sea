#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>


int main()
{
    pid_t pid;
    pid = Fork();
    if(pid == 0) 
    {
        // child process
        printf("\nChild process %d\n", getpid());
        fflush(stdout);
    }
    else 
    {
       // parent process 
        printf("\nParent process %d\n", getpid());
        fflush(stdout);
    } 

    exit(0);
}
