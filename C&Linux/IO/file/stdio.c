#include <stdio.h>


int main(){
	int ch;
	char buf[30];
	if(setvbuf(stdin,NULL,_IONBF,0) != 0){
		sprintf(buf,"sorry setbuf %s error","stdin");
		fputs(buf,stdout);
		return 1;
	}
	if(setvbuf(stdout,NULL,_IONBF,0) != 0){
		sprintf(buf,"sorry setbuf %s error","stdout");
		fputs(buf,stdout);
		return 1;
	}
	while((ch=fgetc(stdin)) != 'a'){
		fputc(ch,stdout);
	}
	return 0;
}
