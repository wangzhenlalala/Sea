#include <stdio.h>
#include <signal.h>
#include <stdlib.h>

	static void sig_usr(int);
int main(){
	if(signal(SIGUSR1,sig_usr) == SIG_ERR)
		printf("can't catch signal USER1\n");
	if(signal(SIGUSR2,sig_usr) == SIG_ERR)
		printf("can't catch signal USER2\n");
	for(;;)
		sleep(3);
	return 0;
}
static void sig_usr(int signo){
	if(signo == SIGUSR1)
		printf("received SIGUSER1\n");
	else if(signo == SIGUSR2)
		printf("received SIGUSER2\n");
	else
		printf("received signal %d \n",signo);

	return ;
	
}
