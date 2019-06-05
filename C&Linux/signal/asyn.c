#include <stdio.h>
#include<unistd.h>
#include<signal.h>
#include <stdlib.h>

void handler(int sig){
	for(int i=0;i<6;i++){
		printf("handler : %d\n",i);
		fflush(stdout);
		sleep(3);
	}
	return;
}

int main(){
	if(signal(SIGINT,handler) == SIG_ERR){
		printf("sorry signal error\n");
		exit(0);
	}
	for(int i = 0; i<5; i++){
		sleep(1);
		printf("main : %d\n",i);
		fflush(stdout);
	}
	return 0;
}
