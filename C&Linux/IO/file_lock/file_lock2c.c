#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>


int main(){
	struct flock lock_f;
	int res;
	int file_d;

	file_d=open("temp",O_CREAT | O_RDWR  ,0666);

	if(file_d == -1){
		printf("can't open file !!!\n");
		perror("error is :");
		exit(EXIT_FAILURE);

	}
	lock_f.l_type=F_WRLCK;
	lock_f.l_whence=SEEK_SET;
	lock_f.l_start=0;
	lock_f.l_len=0;
/*
	res=fcntl(file_d,F_SETLK,&lock_f);

	if(res == -1 ){
		printf("can't lock file !!!\n");
		perror("error is :");
		exit(EXIT_FAILURE);

	}
*/

	printf("open and lock file !!  OK !!!\n");
	sleep(60);
	//getchar();
	printf("exit !!");
	exit(EXIT_SUCCESS);

	}
