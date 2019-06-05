#include <unistd.h>
#include <stdlib.h>
#include <dirent.h>
#include <string.h>
#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>

int printdir(char*,int);
int main(){
    printf("printf directory begins!\n");
    printdir("/test",0);
    exit(0);
}

int printdir(char *path,int depth){
    DIR *dirp;
    struct dirent* entry;
    struct stat statbuf;
    chdir(path);
    //it is very strange that i change directory to path above will make 
    //my program fail !!! but do it before while is right!!!

    dirp = opendir(path);
    if(dirp == NULL){
        fprintf(stderr,"sorry,open directory : %s failed\n",path);
        return ;
    }

    //chdir(path);
    while((entry = readdir(dirp)) != NULL){
        lstat(entry->d_name,&statbuf);
        if(S_ISDIR(statbuf.st_mode)){
            if(strcmp(".",entry->d_name) == 0 || strcmp("..",entry->d_name) == 0)
                continue;
            printf("%*s%s/\n",depth," ",entry->d_name);
            printdir(entry->d_name,depth+4);
        }else{
            printf("%*s%s\n",depth," ",entry->d_name);
        }
    }
    chdir("..");
    closedir(dirp);
}
