#include<stdio.h>
#include<sys/types.h>
#include <signal.h>
#include<unistd.h>

void print_sig_info(){
	sigset_t d_sigset;
	sigemptyset(&d_sigset);
	sigprocmask(0,NULL,&d_sigset);
	printf("KILL is %s\n",sigismember(&d_sigset,SIGKILL) ? "closed" : "open");
	printf("USER1 is %s\n",sigismember(&d_sigset,SIGUSR1) ? "closed" : "open");
	return;
}
void usr1_handler(int sig){
	puts("handling SIGUSR1");
	return;
}
int main(){
	sigset_t d_sigset_1;

	signal(SIGUSR1,usr1_handler);
	print_sig_info();
	puts("sending a SIGUSR1.before being blocked");
	kill(getpid(),SIGUSR1);

	sigemptyset(&d_sigset_1);
	sigprocmask(0,NULL,&d_sigset_1);
	sigaddset(&d_sigset_1,SIGUSR1);
	sigprocmask(SIG_SETMASK,&d_sigset_1,NULL);
	
//when a signal is blocked,it will not be handled ,but it is pended...
	print_sig_info();
	puts("sending a SIGUSR1.after being blocked");
	kill(getpid(),SIGUSR1);
	sigpending(&d_sigset_1);
	printf("KILL is %s\n",sigismember(&d_sigset_1,SIGKILL) ? "pending" : "not pending");
	printf("USER1 is %s\n",sigismember(&d_sigset_1,SIGUSR1) ? "pending" : "not pending");
// when the signal is unblocked and is pended,it will be handled right away!!!
	puts("after unblocked SIGUSR1");
	sigprocmask(0,NULL,&d_sigset_1);
	sigdelset(&d_sigset_1,SIGUSR1);
	sigprocmask(SIG_SETMASK,&d_sigset_1,NULL);
	return 0;
}
