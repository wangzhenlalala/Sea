#include <unistd.h>
#include <stdio.h>
#include <ncurses.h>

void renderWhite_Black(WINDOW*);
void renderColored(WINDOW*);

int main(){
	WINDOW *firstWin = NULL;
	WINDOW *alertWin = NULL;
	int row,col;
	int ch = 'a';
	initscr();
	for(row=0; row<LINES;row++){
		for(col=0; col<COLS; col++){
			mvwaddch(stdscr,row,col,ch);
			ch++;
			if(ch > 'z') ch = 'a';
		}
	}
	wrefresh(stdscr);
	sleep(3);
	ch='0';	
	firstWin = newwin(10,20,10,10);
	alertWin = newwin(10,20,10,35);
	if(!has_colors()){
		mvwprintw(alertWin,2,1,"%s","your terminal does not support COLORS");
		wrefresh(alertWin);
	}else{
		mvwprintw(alertWin,2,1,"%s","COLORS is OK");
		wrefresh(alertWin);
	}
	if(start_color() != OK){
	//	wclear(alertWin);
		mvwprintw(alertWin,4,1,"%s","init COLORS failed!!");
		wrefresh(alertWin);
		sleep(2);
		renderWhite_Black(firstWin);
	}else{
		mvwprintw(alertWin,4,1,"%s","init COLORS succeed!!");
		wrefresh(alertWin);
		sleep(2);
		renderColored(firstWin);
	}
	sleep(5);
	endwin();
	return 0;
}

void renderWhite_Black(WINDOW *winHandler){
	int row,col,ch='0';
	wattron(winHandler,A_STANDOUT);
	for(row=0; row<10;row++){
		for(col=0; col<20; col++){
			mvwaddch(winHandler,row,col,ch);
			ch++;
			if(ch > '9') ch = '0';
		}
	}
	wattroff(winHandler,A_STANDOUT);
	//refresh();
	//wrefresh(firstWin);
	//touchwin(firstWin);
	wrefresh(winHandler);
}

void renderColored(WINDOW *winHandler){
	int row,col,ch='0';
	init_pair(1,COLOR_RED,COLOR_YELLOW);
	wattron(winHandler,COLOR_PAIR(1));
	for(row=0; row<10;row++){
		for(col=0; col<20; col++){
			mvwaddch(winHandler,row,col,ch);
			ch++;
			if(ch > '9') ch = '0';
		}
	}
	wattroff(winHandler,COLOR_PAIR(1));
	wrefresh(winHandler);
}
