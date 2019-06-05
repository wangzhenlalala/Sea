#include <stdio.h>
#include<stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>

int main(int argc,char** argv){
	int i=0;
	struct stat my_stat;
	if(argc<2){
		fprintf(stderr,"sorry too few argument");
		return 1;
	}
	for(i=1;i<argc;i++){
		printf("%s:",argv[i]);
		if(lstat(argv[i],&my_stat) < 0){
			printf("something bad happene");
			exit(0);
		}
		if(S_ISREG(my_stat.st_mode))
			printf("regular file\n");
		else if(S_ISDIR(my_stat.st_mode))
			printf("directory file\n");
		else if(S_ISLNK(my_stat.st_mode))
			printf("link file\n");
		else
			printf("something like FIFO,BLOCK,CHAR,SOCKET\n");

	}
	return 0;
}
