#include <stdio.h>
#include <fcntl.h>
#include<stdlib.h>
#include <errno.h>
#include <string.h>
#define LINE_SIZE 1024
#define  TIME  15
int main(){

	char str;
	int file_d;
	int byte=TIME;
	struct flock lock_f;
	file_d=open("temp",O_CREAT | O_RDWR,0666 );
	if(file_d == -1){
		printf("error occured:%d\n",errno);
		//printf("error:%s",strerr(errno));
		perror("error is:");
		exit(EXIT_FAILURE);
	}
	printf("open succeed\n");
	printf("file descriptor is :%d\n",file_d);
	
	//flock() is used to lock a file .
	//lock_SH | LOCK_NB   LOCK_UN  LOCK | LOCK_NB(not block)
	//lock_nb means that if add a block failed the process returns 
	//right now rather than block itself.

/*	if((flock(file_d,LOCK_EX) == -1)){
		printf("can't lock file\n");
		perror("error is:");
		exit(EXIT_FAILURE);
	}
*/

	lock_f.l_type=F_WRLCK;
	lock_f.l_whence=SEEK_SET;
	lock_f.l_start=0;
	lock_f.l_len=0;
	lock_f.l_pid=-1;  //when set lock l_pid is not needed !!

	if(fcntl(file_d,F_GETLK,&lock_f) == -1 );
	{
		printf("can't lock file\n");
		perror("error is:");
		//exit(EXIT_FAILURE);        
	}

	printf("\n%d\n",lock_f.l_pid);

	while((read(file_d,&str,1))==1){
		write(1,&str,1);
		}
	

	/*while(1){
		printf("time:%d\n",byte--);
		sleep(1);
		if(!byte) break;
	}
	*/

	getchar();

//	flock(file_d,LOCK_UN);
//
	close(file_d);

	exit(EXIT_SUCCESS);
}
