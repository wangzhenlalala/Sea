#include<stdio.h>
#include <unistd.h>
#include<signal.h>
void alarm_handler(int sig){
	printf("3 seconds passed\n");
	alarm(3);
	return;
}
int main(){
	signal(SIGALRM,alarm_handler);
	alarm(3);
	for(;;){
	}
	return 0;
}
