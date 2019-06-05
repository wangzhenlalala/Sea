#include <ncurses.h>
#include <stdlib.h>



int main(){

	WINDOW *child2,*child1,*parent;
	int ch;
	int x,y;
	int new_x=10,new_y=10,old_x,old_y;
	initscr();
	cbreak();
	start_color();
	curs_set(0);

	init_pair(1,COLOR_YELLOW,COLOR_BLACK);
	init_pair(2,COLOR_BLUE,COLOR_BLACK);

	keypad(stdscr,TRUE);
	noecho();


	attron(COLOR_PAIR(1));
	box(stdscr,'a','b');
	attron(COLOR_PAIR(1)); 

	attron(COLOR_PAIR(2));
//ACS_yourchar    is short for alternative character set 
	mvaddch(new_y,new_x,ACS_BLOCK);
	attron(COLOR_PAIR(2)); 

	refresh();
	
//create the parent window	
//and i guess box() will make the window empty first ,then it will print border char in border
//so you must first call box(), then call other printing-function
//otherwise box will override yout print !!!!
	parent=newwin(10,30,10,10);
	box(parent,'+','+');
	mvwprintw(parent,1,1,"parent");
	wrefresh(parent);
//subwin(),will create child-window according to the stdscr-window coordinate'origin.
//in other word , parent and child use the same origin.
//if the child is not in the parent,child will not appear.
	child1=subwin(parent,5,9,11,30);
	wattrset(child1,A_STANDOUT);
	box(child1,'-','-');
	mvwprintw(child1,1,1,"child1");

//derwin(),will also make a child-window,but it is relative to its parent'coordinate
//and i think it is much more convient than subwin().
	child2=derwin(parent,5,9,5,5);
	box(child2,'-','-');
	mvwprintw(child2,1,1,"child2");

//and you must call touchwin(),when refresh parent window or its child window.
	touchwin(parent);
	wrefresh(child2);
	wrefresh(child1);

	while((ch=getch()) != KEY_F(3) ){
		old_x=new_x;
		old_y=new_y;
		switch(ch){
			case KEY_UP :
				new_y--;
				break;
			case KEY_DOWN:
				new_y++;
				break;
			case KEY_LEFT:
				new_x--;
				break;
			case KEY_RIGHT:
				new_x++;
				break;
			default: break;

		}	
		if(new_x < 0) new_x=0;
		if(new_y < 0) new_y=0;
		if(new_x >= COLS-1) new_x=COLS-1;
		if(new_y >= LINES-1) new_y=LINES-1;

		mvaddch(old_y,old_x,' ');

		attron(COLOR_PAIR(2));
		mvaddch(new_y,new_x,ACS_RARROW);
		attroff(COLOR_PAIR(2));
		
		refresh();
	}

	getch();



	endwin();

}
