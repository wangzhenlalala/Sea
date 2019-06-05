#include <stdio.h>
#include <sys/types.h>
#include <fcntl.h>
#define FILE_MODE (S_IRUSR | S_IWUSR | S_IXUSR)
int main(){
	char buf1[] = "abcdefghijklmnopq";
	char buf2[] = "01234567890abcdddf";
	int filefd;
	if((filefd = creat("/home/wangzhen/my-c/new_c/seek_hole/hose.txt",FILE_MODE))==-1)
		printf("\ncerate error\n");
	if(write(filefd,buf1,10) != 10)
	{
		fprintf(stderr,"write error");
		return 1;
	}
	if(lseek(filefd,40,SEEK_CUR) == -1){
		printf("\n seek error\n");
		return 2;
	}

	if(write(filefd,buf2,10) != 10)
	{
		fprintf(stderr,"write error");
		return 1;
	}
	close(filefd);

	return 0;
}
