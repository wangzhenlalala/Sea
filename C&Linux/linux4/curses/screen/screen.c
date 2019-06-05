#include <stdio.h>
#include <unistd.h>
#include <ncurses.h>
#include <string.h>

int main(){
    char greet[] = "wangzhen ni hao";
    char* cur;
    initscr();
    move(5,15);
    printw("%s","hello cursor");
    cur = strlen(greet) -1 + greet; 
    attron(A_DIM);
    while(cur != greet-1){
        move(10,15);
        //addch(*cur--);
		insch(*cur--);
	   // sleep(1); //uncommented this line ,you will not get expected result!!
    }
    attroff(A_DIM);
    move(LINES-1,COLS-1);
    refresh();
    sleep(5);
    endwin();
    return 0;
}
