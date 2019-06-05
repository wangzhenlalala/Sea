#include <stdio.h>
#include <stdlib.h>

int main(int argc,char** argv){
	for(int i = 0;i < argc;i++)
		printf("argv[%d] is %s \n",i,argv[i]);
	puts(getenv("USER"));
	putenv("HELLO=world");
	puts(getenv("HELLO"));
	setenv("HELLO","changed world",1);
	puts(getenv("HELLO"));
//	unsetenv("HELLO");
//	puts(getenv("HELLO"));
	putenv("HELLO");
	puts(getenv("HELLO"));// if a name is unseted or delete ,it can be accessed,
				//a segement fault is met
	return 0;
}
