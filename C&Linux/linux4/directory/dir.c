#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h> //malloc

void handleDir(char*,char*);
char head[] = "|    ";
int main(){
    char path[] = ".."; 
    char nowPath[PATH_MAX];
    char currentPath[PATH_MAX];
    char *lastSlash = NULL;
    getcwd(nowPath,PATH_MAX);
    chdir(path);
    getcwd(currentPath,PATH_MAX);
    lastSlash = strrchr(currentPath,'/');
    printf("%s\n",lastSlash + 1);
    chdir(nowPath);
    handleDir(path,head);
}

void handleDir(char* dirPath,char* prefix){
    DIR *dirp;
    struct dirent *entry;
    struct stat fileState;
    char *nextPrefix = NULL;
    dirp = opendir(dirPath);
    chdir(dirPath);

    nextPrefix = malloc(strlen(prefix) + 6);
    memset(nextPrefix,' ',strlen(prefix) + 6);
    strcpy(nextPrefix,prefix);
    strcpy(nextPrefix + strlen(prefix),head); 

    while((entry = readdir(dirp)) != NULL){
        lstat(entry->d_name,&fileState);
        if(S_ISDIR(fileState.st_mode)){
            if(strcmp(".",entry->d_name) == 0 || strcmp("..",entry->d_name) == 0) continue;
            printf("%s%s\n",prefix,entry->d_name);
            handleDir(entry->d_name,nextPrefix);
        }else{
            printf("%s%s\n",prefix,entry->d_name);
        }
    }
    free(nextPrefix);
    chdir("..");
    closedir(dirp);
}
