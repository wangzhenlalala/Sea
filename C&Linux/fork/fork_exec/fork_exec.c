#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<sys/types.h>
#include<sys/wait.h>
static void myexit(void){
	printf("hello,i am in atexit() and my pid is:%d\n",getpid());
	return;
}

int main(){
	pid_t child;
	char* param[] = {"param 1","param 2","param 3",NULL};
	char* env[] = {"PATH=/usr/bin:/usr/local/bin","USER=hello_i_am_wangzhen",NULL};
	atexit(myexit);
	printf("father pid is:%d\n",getpid());
	if((child = fork())<0){
		printf("sorry,fork error");
		exit(1);
	}else if(child == 0){
		if(atexit(myexit)!=0){
			printf("atexit wrong!!! in child");
		}
		printf("child pid is:%d\n",getpid());
		printf("hello i am child ,i am going to execute your program:\n");
		if(execve("/home/wangzhen/my-c/new_c/fork_exec/print_param_envexe",param,env)<0){
			printf("sorry executing your program fails\n");
			exit(2);
		}
		printf("child exit\n");
		return 0;
	}
	//atexit(myexit);
	waitpid(child,NULL,0);
	printf("child exit\n");
	return 0;
}
