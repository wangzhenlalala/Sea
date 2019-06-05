#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>


#define SERVER_FIFO_NAME "./serv_fifo"
#define CLIENT_FIFO_NAME "./cli_%d_fifo"

#define BUFFER_SIZE 20

struct data_to_pass_st {
    pid_t client_pid;
    char some_data[BUFFER_SIZE - 1];
};
