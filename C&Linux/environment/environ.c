#include <stdio.h>
#include <stdlib.h>
extern char **environ;

int main(int argc,char **argv){
	char **env = environ;//maybe envieon can't be modefied,we assign it to our local variable
	puts(getenv("PATH"));
	puts("\n");
	while(*environ){
		printf("%s\n",*environ);
		environ++;
	}
	puts(getenv("TERM"));
	puts(argv[0]);
	return 0;
}
// there is a problem !!!
// when any getenv() is placed after while(*environ), getenv() will fail
// and we get a segement fault!!!! why ???
// but if getenv is ahead while(*environ) ,it is ok !!!

