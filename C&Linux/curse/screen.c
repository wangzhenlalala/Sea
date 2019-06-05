#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <ncurses.h>
#define PW_LEN 1000
#define USER_NAME_LEN 100

int main(){
    int i = 0,length = 0;
    char name[] = "wangzhen";
    char userName[USER_NAME_LEN];
    char password[PW_LEN];
    char pw[] = "wangzhen";
    initscr();

    move(5,16);
    printw("%s","hello curses,again");
    refresh();

    length = strlen(name);
    attron(A_DIM);
    for( i = 0; i< length; i++){
        move(10,16);
        //insert a char will write a char at the place of the cursor,the move all chars
        //after cursor forword
        insch(*(name + i));
    }
    refresh();
    attron(A_BOLD);
    for( i = 0; i< length; i++){
        move(13,16);
        addch(*(name + i));
    }
    attroff(A_DIM);
    attroff(A_BOLD);
    refresh();
    sleep(3);

    clear();
    move(15,16);
    printw("%s","please login");


    move(17,16);
    printw("%s","please input user name:");
    getstr(userName); //getstr will refresh automatically;

    move(18,16);
    printw("%s","please input your password:");

    noecho();
    cbreak();
    i = 0;
    memset(password,'\0',sizeof(password));
    while(i < PW_LEN){
      password[i] = getch();
      if( password[i] == '\n') break;
      move(18,strlen("please input your password:") + 16 + i);
      addch('*');
      refresh();
      i++;
    }
    move(19,16);
    printw("%s: %s","your password is",password);
    refresh();

    echo();
    nocbreak();
    endwin();
    return 0;
}
