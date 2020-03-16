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
    int const i_children = 5;
    pid_t pid[i_children], retpid;
    int status, i=0;
    for(int j=0; j<i_children; j++)
    {
        if( (pid[j] = Fork()) == 0)
        {
            // child process
            exit(100 + j);
        }
            
    }

    i=0;

    while( (retpid=waitpid(pid[i++], &status, 0)) > 0)
    {
        if(WIFEXITED(status))
        {
            printf("child %d terminated normally with exit status=%d\n", retpid, WEXITSTATUS(status));
        }
        else
        {
            printf("child %d terminated abnormally\n", retpid);
        }
        fflush(stdout);
    }

    if(errno != ECHILD)
    {
        fprintf(stderr, "waitpid error %s\n", strerror(errno));
        exit(-1);
    }

    printf("Parent process wait for all children.\n");
    for(i=0; i<i_children; i++) {
        printf("\t %d  - %d\n", i, pid[i]);
    }
}
