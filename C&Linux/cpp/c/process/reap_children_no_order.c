#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <wait.h>
#include "utils.h"


int main()
{
    int i_children = 5;
    pid_t pid;
    int status;
    for(int j=0; j<i_children; j++)
    {
        if( (pid = Fork()) == 0)
            // child process
            exit(100 + j);
    }

    while( (pid=waitpid(-1, &status, 0)) > 0)
    {
        if(WIFEXITED(status))
        {
            printf("child %d terminated normally with exit status=%d\n", pid, WEXITSTATUS(status));
        }
        else
        {
            printf("child %d terminated abnormally\n", pid);
        }
        
    }

    if(errno != ECHILD)
    {
        fprintf(stderr, "waitpid error %s\n", strerror(errno));
        exit(-1);
    }

    printf("Parent process wait for all children.\n");
}
