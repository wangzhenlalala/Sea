#include<stdio.h>
#include<unistd.h>
#include<ncurses.h>

#define PASSWORD_MAX 30
#define NAME_MAX 30

int main(){
	char logName[NAME_MAX];
	char password[PASSWORD_MAX];
	int i = 0;
	initscr();

	move(5,10);
	printw("please login");
	move(7,10);
	printw("your name: ");
	refresh();
	getnstr(logName,NAME_MAX);
	move(8,10);
	printw("your password: ");
	cbreak();
	noecho();
	while(i < PASSWORD_MAX - 1){ 
		password[i] = getch();
		if(password[i] == '\n'){
			password[i] = '\0';
			break;
		}
		move(8,25+i);
		addch('*');
		refresh();
		i++;
	}
	move(10,10);
	printw(password);
	refresh();	
	sleep(8);
	endwin();
	return 0;
}
