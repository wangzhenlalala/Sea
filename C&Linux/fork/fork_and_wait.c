#include<stdio.h>
#include<wait.h>
#include <sys/types.h>
#include <unistd.h>
#include <error.h>
#include <stdlib.h>
int main(){
	pid_t child_pid;
	int i = 10,j=10;
	write(STDOUT_FILENO,"now begin:\n",11);
	if((child_pid = fork()) < 0){
		printf("some error occurs!\n");
		perror("error is : ");
		puts("\n");
		return 1;
	}else if(child_pid == 0){
		while(i){
			printf("i am child[%d]\n",i);
			fflush(stdout);
			sleep(2);
			i--;
		}
		exit(0);
	}
	
	//i am parent
	while(j){
		wait(NULL);
		printf("papa is here\n");
		fflush(stdout);
		sleep(3);
		j--;
	}
	printf("child-ID is : %d\t parent-ID is %d\n",child_pid,getpid());
	exit(0);
}
