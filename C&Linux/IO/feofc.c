#include <stdio.h>
#include <stdlib.h>
/*
#the function feof() will test what functions like fgetc() ++have got++ from 
#the specified stream.....

#so if you write :while(!feof(fp)) {prinf("%c",ch);}
#you will also read the end-of-line char into your program.

#that means you read one more char than your original file.
*/
int main(){

	char ch;
	FILE *fp;
	fp=fopen("prii.c","r+");
	if(!fp){
		perror("can't open the file:");
		exit(EXIT_FAILURE);
	}
	while(1){
		ch=fgetc(fp);
		if(feof(fp)) break;
		printf("%c",ch);

	}
	puts("\n");
	exit(EXIT_SUCCESS);
}
