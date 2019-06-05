#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>
#include <sys/stat.h>
 void printdir(const char *dir , int depth){
	DIR *dirp;
	struct dirent *mydirent;
	struct stat statbuf;

	if((dirp = opendir(dir))==NULL)
	{
		printf("something is wrong:");
		exit(1);
	}
       chdir(dir);

       while((mydirent = readdir(dirp))!=NULL)
       {
	       lstat(mydirent->d_name,&statbuf);
	       if(S_ISDIR(statbuf.st_mode))
	       {
                    if(strcmp(".",mydirent->d_name)==0 || strcmp("..",mydirent->d_name)==0)	       
			    continue;

		    printf("%*s%s/\n",depth," ",mydirent->d_name);
		    printdir(mydirent->d_name,depth+4);
	       }
	       else
		       printf("%*s%s\n",depth," ",mydirent->d_name);
	 }
       chdir("..");
       closedir(dirp);


       }



int main(int argc,char *argv[]){
	
	printf("directory of /home/wangzhen:\n");
	printdir("/home/wangzhen",0);
	return 0;
}
