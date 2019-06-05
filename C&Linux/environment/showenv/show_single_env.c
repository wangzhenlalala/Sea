#include <stdio.h>
#include <string.h>
#include <stdlib.h>
//if you are going to get an environment variable,you might have three
// results:1,no_existence 2,exist but empty 3,exist and not empty 
//so you must include three conditions in your program
//the return value ,NULL meams no-existence and strlen(value) means empty
int main(int argc,char** argv){

	char *env;
	char *value;

	if(argc==2){
		env=argv[1];
		value=getenv(env);
		if(value==NULL)
			printf("the variable  [%s]  does not exist!",env);
		else if(strlen(value)==0)
			printf("the variable [%s] is empty!",env);
		else 
			printf("%s",value);
		puts("\n");
	}
	else
		exit(EXIT_SUCCESS);

}
