#include<stdio.h>
#include <string.h>
#include <pwd.h>
#include <errno.h>
#include <unistd.h>
#include <signal.h>
static void my_alarm(int);

int main(){
	struct passwd *ptr;
	signal(SIGALRM,my_alarm);
	alarm(1);
	for(;;){
		if((ptr = getpwnam("wangzhen"))== NULL)
			perror("getpwnam error!");
		if(strcmp(ptr->pw_name,"wangzhen") != 0)
			printf("return value corruted !, pw_name = %s\n",ptr->pw_name);
	}
	return 0;
}
static void my_alarm(int signo){
	struct passwd *rootptr;
	printf("in signal handler\n");
	if((rootptr = getpwnam("root")) == NULL)
		perror("getpwname(root) error");
	alarm(1);
	return ;
}
