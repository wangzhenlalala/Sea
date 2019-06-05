#include <stdio.h>
#include <unistd.h>
#include <ncurses.h>


int main(){
    WINDOW *new_window = NULL;
    WINDOW *sub_window = NULL;
    int i = 0, j=0;
    int letter = 'a';
    initscr();
    new_window = newwin(20,20,5,5);
    sub_window = subwin(stdscr,20,20,5,26);
    scrollok(sub_window,1);
    box(new_window,'|','+');
    
    for(i=0;i<LINES -1 ;i++){
        for(j=0;j<COLS-1;j++){
            mvwaddch(stdscr,i,j,letter);
            letter++;
            if(letter > 'z') letter = 'a';
        }
    }
    touchwin(stdscr);
    refresh();
    sleep(2);
    
    
    mvwprintw(new_window,2,2,"%s: %d","rows",LINES);
    mvwprintw(new_window,4,2,"%s: %d","columns",COLS);
    mvwprintw(new_window,6,2,"%s","how many years have i waited to have you be with me?");
    wrefresh(new_window);
    sleep(2);
    
    werase(sub_window);
    mvwprintw(sub_window,2,2,"%s: %d","rows",LINES);
    mvwprintw(sub_window,4,2,"%s: %d","columns",COLS);
    mvwprintw(sub_window,6,2,"%s","how many years have i waited to have you be with me?");
    wrefresh(sub_window);
    sleep(2);
    for(i=0;i<555550;i++){
        wprintw(sub_window,"%*s",i,"**");
        wrefresh(sub_window);
        sleep(1);
    }
    
    delwin(new_window);
    endwin();
    return 0;
}
