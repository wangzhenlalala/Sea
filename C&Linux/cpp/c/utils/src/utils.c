#include "../include/utils.h"

pid_t Fork(void)
{
    pid_t pid = fork();
    if(pid < 0) 
    {
        fprintf(stderr, "fork error %s\n", strerror(errno));
        exit(-1);
    }
    return pid;
}