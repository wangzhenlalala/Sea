#include<stdio.h>
#include<signal.h>
#include<sys/types.h>
#include<unistd.h>
void int_handler(int sig){
	static int times = 1;
	printf("handling SIGINT %d times\n",times);
	times++;
	sleep(5);
	puts("handled finished");
	return;
}
int main(){
	signal(SIGINT,int_handler);
	sleep(5);
/*	kill(getpid(),SIGUSR1);
	sleep(2);
	kill(getpid(),SIGUSR1);
	kill(getpid(),SIGUSR1);
	kill(getpid(),SIGUSR1);
this will not ok,handler will be invoked 4 times,,because code stream will be interrupted and
go to handler code stream;
*/
	return 0;
}
