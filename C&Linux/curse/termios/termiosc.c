#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <termios.h>
#include <string.h>



int main(){


	char ch, str_ptr[20];
	int i=0;
        struct	termios initial_term,new_term;
	
	FILE *out=fopen("/dev/tty","w");
	FILE *in=fopen("/dev/tty","r");


         tcgetattr(fileno(in),&initial_term);	
	new_term=initial_term;
	//new_term.c_lflag &= ~ECHO;

	new_term.c_lflag &= ~ICANON;
	new_term.c_lflag &= ~ECHO;
	new_term.c_cc[VMIN] = 1;
	new_term.c_cc[VTIME]=0;
	tcsetattr(fileno(in),TCSANOW,&new_term);
	/*  this block is to demonstrate how to turn off the echo wit c code


	tcsetattr(fileno(in),TCSANOW,&new_term);
	fgets(str_ptr,20,in);//fgets() will retrun the '\n' to the caller !
	
	tcsetattr(fileno(in),TCSANOW,&initial_term);
	
	fprintf(out,"%d\n",strlen(str_ptr));
	str_ptr[strlen(str_ptr)-1]='\0';
	fprintf(out,str_ptr);
*/
	


	while(1){
		fprintf(out,"your your your option is :");
		fflush(out);
		ch=fgetc(in);
	       	// without fflush() , the above line ' output will not appear whe
	        //n first entering into while(),
	        //so we can guess that non-canonical mode will flush the stream 
	        // everytime a character is inputed to the catch !!
	        // so the first loop ' fprintf can appear .
		//and this matter doesn't appear when using stdout.

		if(ch == 'q') break;
		fprintf(out,"%c\n",ch);
	}
	tcsetattr(fileno(in),TCSANOW,&initial_term);
	/*the first i make a mistake that i restore the attr sa new_term , when the program exit ,the shell can't echo the input, so i guess  the struct termios is a system wide variable,the os also use it to control the terminal . if someone changed it in his program and does't shift it back , it will leave itself changed*/
	fprintf(out,"hello wangzhen .  do you see this line ? it is for the stdout\n");
	fprintf(out,"moring wangzhen,this line is for termnal output\n");

	exit(EXIT_SUCCESS);
	

}
