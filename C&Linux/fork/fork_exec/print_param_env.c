#include <stdio.h>
extern char** environ;
int main(int argc,char** argv){
	int literator;
	char** env=environ;
	for(literator = 0;literator < argc;literator++){
		puts(argv[literator]);
	}
	while(*env){
		puts(*env);
		env++;
	}
	return 0;
}
