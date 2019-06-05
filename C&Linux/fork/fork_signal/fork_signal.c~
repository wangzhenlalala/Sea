#include<stdio.h>
#include<sys/types.h>
#include<signal.h>
#include <unistd.h>
#include<wait.h>
#define FOR_NUM 10

void child_sig_handler(int sig){
	pid_t child = waitpid(-1,NULL,0);
	printf("child %d died \n",child);
	fflush(stdout);
	return ;
}

int main(){
	pid_t child;
	int i=0;
	signal(SIGCHLD,child_sig_handler);
	if((child = fork()) < 0){
		printf("fork error!");
		fflush(stdout);
		return 1;
	}else if(child != 0){
		printf("i am child : %d \n",(int)getpid());
		fflush(stdout);
		for(i =0;i<FOR_NUM;i++){
			printf("child %d\n",i);
			fflush(stdout);
		}
		printf("child exit\n");
		fflush(stdout);
		return 0;
	}

//	waitpid(-1,NULL,WNOHANG);
	printf("i am father : %d \n",(int)getpid());
	fflush(stdout);
	for(i =0;i<FOR_NUM;i++){
		printf("father %d\n",i);
		fflush(stdout);
	}
//	sleep(2);
	printf("father  exited \n");
	fflush(stdout);
	
	return 0;
}
