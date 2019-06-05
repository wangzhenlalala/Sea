#include <stdio.h>
#include <stdlib.h>
#include <curses.h>

int main(){
	int row=0,col=7;

	initscr();
/*
	move(0,0);
	printw("hello,this is 0.0");

	move(29,39);
	printw("hello world");
	refresh();
*/

	for(row=0;row<LINES;row++){
		move(row,0);
		printw("row: %d",row);
		for(col=8;col<COLS;col++){
			move(row,col);
			addch('a');
		}
	}
	refresh();
	sleep(3);

	move(3,4);
	deleteln();
	attron(A_REVERSE);
	printw("hello,i am wangzhen");
	attroff(A_REVERSE);
	refresh();
	sleep(3);

	move(13,13);
	insertln();
	refresh();
	sleep(3);

	endwin();
	return 0;
}
