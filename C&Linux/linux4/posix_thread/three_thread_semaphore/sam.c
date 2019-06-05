#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <semaphore.h>
#include <pthread.h>

#define WORK_SIZE 1024
char work_area[WORK_SIZE];


void *thread_function(void *);
sem_t bin_sem;

// the implied condition is : when the main thread write the user input into the work area, child 
//thread process with work area, in the meanwhile the main thread ask for user's next input, but 
//the next user input will not write into work area before child thread process with work area,
//because child thread run far fast than human input!!!!!
int main(){
    int res;
    void *exit_res;
    pthread_t a_thread;

    res = pthread_create(&a_thread, NULL, thread_function, NULL);
    if(res != 0){
        fprintf(stderr,"sorry pthread_create failed\n");
        exit(EXIT_FAILURE);
    };

    res = sem_init(&bin_sem, 0, 0);
    if(res != 0){
        fprintf(stderr,"sorry semaphore initiation failed\n");
        exit(EXIT_FAILURE);
    };
    printf("input some text. Enter 'end' to finish\n");
    while( strncmp("end",work_area, 3) != 0 ){
        fgets(work_area,WORK_SIZE, stdin);
        sem_post(&bin_sem);
        // sleep(1);
    };

    printf("waiting for thread to exit\n");
    res = pthread_join(a_thread,&exit_res);
    if(res != 0){
        fprintf(stderr,"sorry  pthread_join failed\n");
        exit(EXIT_FAILURE);
    };
    printf("thread joined\n");
    sem_destroy(&bin_sem);   
    exit(EXIT_SUCCESS);
}

void * thread_function(void* args){
    sem_wait(&bin_sem);
    while( strncmp("end", work_area, 3) != 0){
        printf( "your input's length is: %lu\n", strlen(work_area)-1 );
        // sleep(1);
        sem_wait(&bin_sem);
    }
    pthread_exit(NULL);
}