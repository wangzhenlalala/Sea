#include <sys/types.h>
#include <unistd.h>
#include<stdio.h>
#include<stdlib.h>
#include<wait.h>

int main(){
   pid_t pid;
   char* message;
   int i, exit_code;
   pid = fork();
   switch(pid) {
       case -1:
            fprintf(stderr, "fork failed\n");
            exit(-1);
        case 0:
            message = "this is child";
            i = 5;
            exit_code = 5;
            break;
        default:
            message = "this is parent";
            i = 3
            exit_code = 3;
            break; 
   }
   for(; i>0; i--){
       //printf(message); //warning 
       //printf("%s", message);// ok
       puts(message);
       sleep(1); //if we omit this line , parent process will execute all the code within its curernt time slice. then the child starts to output
   }

   if(0 != pid){
       //can we declare variable here !!
       int return_status;
       pid_t child_pid;
       child_pid = wait(&return_status);
       if( WIFEXITED(return_status) ){
           printf("Child has finished: PID: %d\n", child_pid);
       }else{
           printf("Child has terminated abnormally\n");
       }
   }
   /*
    if child process exited before its parent process,and then its parent process is terminated abnormally,
    this process becomes a zoobie and will be inherited by init (then will be collect in the futher time)
   **/
   exit(exit_code);
}