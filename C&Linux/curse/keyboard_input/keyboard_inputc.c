#include <stdio.h>
#include <unistd.h>
#include <curses.h>
#include <stdlib.h>
#include<string.h>
#define ARR_SIZE 20

int main(){
	initscr();
	int col,row,i;
	char pwd_str[ARR_SIZE];
	for(row=0;row<4;row++){
		for(col=0;col<COLS;col++)
		addch('*');
	}		
	refresh();

	noecho();

	move(4,COLS/2-14);
	printw("password:");
	refresh();

	cbreak();

	for(i=0;i<ARR_SIZE;i++){
		*(pwd_str+i)=getch();
		if(pwd_str[i]=='\n') break;

		addch('*');
	}
	pwd_str[i]='\0';			

	nocbreak();

	echo();

	move(5,COLS/2-14);
	printw("your password:%s",pwd_str);
	move(6,COLS/2-14);
	printw("your password messures");
	attron(A_STANDOUT);
        printw(" %d ",strlen(pwd_str));
	attroff(A_STANDOUT);
	printw("chars long.");
	refresh();

	sleep(8); // sleep is declared in the file : <unistd.h>
	endwin();
	return 0;
}
