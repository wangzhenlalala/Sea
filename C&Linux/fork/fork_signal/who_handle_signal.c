#include<stdio.h>
#include<string.h>
#include<errno.h>
#include<stdlib.h>
#include<sys/types.h>
#include<signal.h>
#include <unistd.h>
#include<wait.h>
#define FOR_NUM 10

void int_handler(int sig){
	printf("i am  %d  \n",(int)getpid());
	fflush(stdout);
	return ;
}

int main(){
	pid_t child;
	int i=0,time=0;
	signal(SIGINT,int_handler);
	if((child = fork()) < 0){
		printf("fork error!");
		fflush(stdout);
		exit(1);
	}else if(child != 0){
		printf("i am child : %d \n",(int)getpid());
		fflush(stdout);
		while(1){
			;
		}//this makes child to execute forever,you must ps and kill it !!
		printf("child exit\n");
		fflush(stdout);
		return 0;
	}

//	waitpid(-1,NULL,WNOHANG);
	printf("i am father : %d \n",(int)getpid());
	fflush(stdout);
	if((time = sleep(10))<0){
		printf("sleep error!!!\n");
		printf(strerror(errno));
		puts("\n");
	}else{
		printf("sleep time left: %d \n",time);
	}
	printf("father  exited \n");
	fflush(stdout);
	
	return 0;
}
