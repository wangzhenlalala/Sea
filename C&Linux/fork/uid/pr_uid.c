#include <pwd.h>
#include <stdlib.h>
#include<stdio.h>
#include <string.h>
#include<sys/types.h>
#include<unistd.h>

char* get_name_from_uid(uid_t uid){
	struct passwd *pw_ptr;
	char* name=NULL;
	pw_ptr = getpwuid(uid);
	name = malloc(strlen(pw_ptr->pw_name));
	memmove(name,pw_ptr->pw_name,strlen(pw_ptr->pw_name));
	return name;
}
void print_info(void){
	char* name_ptr = NULL;
	printf("my father pid is %d\n",getppid());
	printf("my pid is %d \n",getpid());
	printf("my uid is %d \n",getuid());
	name_ptr = get_name_from_uid(getuid());
	printf("my name is %s\n",name_ptr);
	free(name_ptr);
	fflush(stdout);
	return;
}
