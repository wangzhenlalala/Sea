#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

void *thread_function(void *);

char message[] = "Hello World";

int who = 1;

int main(){
    int res;
    pthread_t a_thread;
    void *thread_result;
    int print_count1 = 0;
    res = pthread_create(&a_thread, NULL, thread_function, (void *)message );
    if( res != 0){
        //error
        fprintf(stderr, "Thread creation failed\n");
        exit(EXIT_FAILURE);
    }

    while(print_count1++ < 20){
        if(who == 1){
            printf("1");
            who = 2;
        }else{
            sleep(1);
        }
    }
    res = pthread_join(a_thread, &thread_result);
    if(res != 0){
        fprintf(stderr, "Thread join failed\n");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined, it returned %s\n", (char *)thread_result );
    printf("Message is now %s\n", message);
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg){
    int print_count2 = 0;
    while(print_count2++ < 20){
       if(who == 2){
           printf("2");
           who = 1;
       }else{
           sleep(1);
       } 
    }
    sleep(3);
    pthread_exit("i am exited\n");
}
