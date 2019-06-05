



/*you can learn that stdscr and other multi-windows have different print-cache-memory !!!*/



#include<stdio.h>
#include <curses.h>


int main(){
	WINDOW *mywin1,*mywin2;
	initscr();

	if(!has_colors()){
		printf("can't support color mode");
		exit(1);
	}
	if(start_color()!=OK){
		printf("can't start color");
		exit(2);
	}


	init_pair(1,COLOR_WHITE,COLOR_GREEN);
	init_pair(2,COLOR_WHITE,COLOR_CYAN);


	mywin1=newwin(10,20,10,0);
	mywin2=newwin(10,20,10,30);

	box(mywin1,'*','*');
	wattrset(mywin1,COLOR_PAIR(1));    //in the multiwindows mode , you must specify the 
	                                   //the window that you want apply attribution to 
	                                   // by using the prefix 'w'.


	mvwprintw(mywin1,3,2,"i am win 1"); //box() must before printw() ,or box will override 
	                                    // the printw. and the border char is also included
	                                    // in the mywin1;; so printw starts at col :1 or >>>
	wrefresh(mywin1);

	box(mywin2,'+','+');
	wattrset(mywin2,COLOR_PAIR(2));
	mvwprintw(mywin2,3,2,"i am win 2");
	wrefresh(mywin2);

        //refresh();    this refresh() should not appear here.it will override mywin1 and mywin2
	
	delwin(mywin1);
	delwin(mywin2);

	endwin();
	return 0;
}
