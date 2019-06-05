#include<stdio.h>
#include<stdlib.h>
#include<dirent.h>

int main(int argc,char *argv[]){
	struct dirent* pdirent;
	DIR *pdir;
	if(argc != 2){
		printf("too few arguments!\n");
		return 1;
	}
	pdir = opendir(argv[1]);
	if(NULL == pdir){
		printf("sorry can't open directory : %s\n",argv[1]);
		exit(1);
	}
	while((pdirent = readdir(pdir)) != NULL){
		printf("got : %s\n",pdirent->d_name);
	}
	closedir(pdir);
	return 0;
}
