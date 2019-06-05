#include <unistd.h>
#include <stdio.h>
#include <ncurses.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_STRING 80 /*longest allowed reponse*/
#define MAX_ENTRY 1024 /*longest allowed database entry*/

#define MESSAGE_LINE 6
#define ERROR_LINE 22
#define Q_LINE 20
#define PROMPT_LINE 18

#define BOXED_LINES 11
#define BOXED_ROWS 60
#define BOX_LINE_POS 8
#define BOX_ROW_POS 2

static char current_cd[MAX_STRING] = "\0";
static char current_cat[MAX_STRING];

const char *title_file = "title.cdb";
const char *tracks_file = "tracks.cdb";
const char *temp_file = "cdb.tmp";

void clear_all_screen(void);
void get_return(void);
int get_confirm(void);
int getchoice(char *greet, char *choices[]);
void draw_menu(char *options[], int hightlight, int start_row, int start_col);
void insert_title(char *cdtitle);
void get_string(char *string);
void add_record(void);
void count_cds(void);
void find_cd(void);
void list_tracks(void);
void remove_tracks(void);
void remove_cd(void);
void update_cd(void);

char *main_menu[] = {
	"aadd new CD",
	"ffind CD",
	"ccount CDs and tracks in the catalog",
	"qquit",
	0,// setting a pointer to 0 means setting it to NULL;
};

char *extended_menu[] = {
	"aadd new CD",
	"ffind cd",
	"ccount CDs and tracks in the catalog",
	"llist tracks on current CD",
	"rremove current CD",
	"uupdate track information",
	"qquit",
	0
};

int main(){
	int choice;
	initscr();
			
	do{
		choice = getchoice("Options: ",current_cd[0] ? extended_menu : main_menu);
		switch(choice){
			case 'q':
				break;
			case 'a':
				add_record();
				break;
			case 'c':
				count_cds();
				break;
			case 'f':
				find_cd();
				break;
			case 'l':
				list_tracks();
				break;
			case 'r':
				remove_cd();
				break;
			case 'u':
				update_cd();
				break;
		}
	} while(choice != 'q');

	endwin();
	return 0;
}

int getchoice(char *greet,char *choices[]){
	static int selected_row = 0;
	int max_row = 0;
	int start_screenrow = MESSAGE_LINE, start_screencol = 10;
	char **option;
	int selected;
	int key = 0;

	option = choices;
	while(*option){
		max_row++;
		option++;
	}
	
	if(selected_row >= max_row){
		selected_row = 0;
	}

	clear_all_screen();
	mvprintw(start_screenrow -2,start_screencol,"%s",greet);
	keypad(stdscr,TRUE);
	cbreak();
	noecho();
	key = '0';
	while(key != 'q' && key != KEY_ENTER && key != '\n'){

		if(KEY_UP == key){
			if(selected_row == 0){
				selected_row = max_row - 1;
			}else{
				selected_row--;
			}
		}

		if(KEY_DOWN == key){
			if(selected_row == max_row -1){
				selected_row = 0;
			}else{
				selected_row++;
			}
		}
		selected = *choices[selected_row];
		draw_menu(choices,selected_row,start_screenrow,start_screencol);
		key = getch();
	}
	keypad(stdscr,FALSE);
	nocbreak();
	echo();

	if('q' == key) selected = 'q';
	return (selected);
}

void draw_menu(char *options[], int current_hightlight,int start_row, int start_col){
	int current_row = 0;
	char **option_ptr;
	char *txt_ptr;
	option_ptr = options;
	while(*option_ptr){
		if(current_row == current_hightlight){
			attron(A_STANDOUT);
		}
		txt_ptr = options[current_row];
		txt_ptr++;
		mvprintw(start_row + current_row,start_col,"%s",txt_ptr);
		if(current_row == current_hightlight){
			attroff(A_STANDOUT);
		}
		option_ptr++;
		current_row++;
	}
	mvprintw(start_row + current_row + 3,start_col,"%s","Move hightlight then press Return ");
	refresh();
}

void clear_all_screen(){
	clear();
	mvprintw(2,20,"%s","CD Database Application");
	if(current_cd[0]){
		mvprintw(ERROR_LINE,0,"Current CD: %s: %s\n",current_cat,current_cd);
	}
	refresh();
}


void get_return(){
}

int get_confirm(){
	int confirmed = 0;
	char first_char;

	mvprintw(Q_LINE,1,"Are you sure?");
	clrtoeol();
	refresh();

	cbreak();
	first_char = getch();
	if(first_char == 'y' || first_char == 'Y'){
		confirmed = 1;
	}
	nocbreak();
	if( !confirmed ){
		mvprintw(Q_LINE,1,"     Canceled");
		clrtoeol();
		refresh();
		sleep(1);
	}
	return confirmed;
}

void insert_title(char *cdtitle){
	FILE *fp = fopen(title_file,"a");
	if(!fp){
	//open file failed
		mvprintw(ERROR_LINE,0,"can not open CD title database");
	}else{
		fprintf(fp,"%s\n",cd_title);
		fclose(fp);
	}
}

void get_string(char *string){
	int len;
	wgetnstr(stdscr,string,MAX_STRING);
	len = strlen(string);
	if(len > 0 && string[len-1] == '\n'){
		string[len-1] = '\0';
	}
}

void add_record(){
	//add a new CD
	char catalog_number[MAX_STRING];
	char cd_title[MAX_STRING];
	char cd_type[MAX_STRING];
	char cd_artist[MAX_STRING];
	char cd_entry[MAX_STRING];

	int screenrow = MESSAGE_LINE;
	int screencol = 10;
	clear_all_screen();
	mvprintw(screenrow,screencol,"Enter new CD details");
	screenrow+=2;

	mvprintw(screenrow,screencol,"Catalog Number: ");
	get_string(catalog_number);
	screen_row++;

	mvprintw(screenrow,screencol,"CD Title: ");
	get_string(cd_title);
	screen_row++;

	mvprintw(screenrow,screencol,"CD Type: ");
	get_string(cd_type);
	screen_row++;

	mvprintw(screenrow,screencol,"CD Artist: ");
	get_string(cd_artist);
	screen_row++;

	mvprintw(PROMPT_LINE - 2,5,"About to add this new entry:");
	sprintf(cd_entry,"%s,%s,%s,%s", catalog_number, cd_title, cd_type, cd_artist);
	mvprintw(PROMPT_LINE,5,"%s",cd_entry);

	refresh();

	move(PROMPT_LINE,0);
	if(get_confirm()){
		insert_title(cd_entry);
		strcpy(current_cd, cd_title);
		strcpy(current_cat, catalog_number);
	}
}

void count_cds(){
}

void find_cd(){
}

void list_tracks(){
}

void remove_tracks(){
}

void remove_cd(){
}

void update_cd(){
	FILE *tracks_fp;
	char track_name[MAX_STRING];
	int len;
	int track = 1;
	int screen_line = 1;
	WINDOW *box_window_ptr;
	WINDOW *sub_window_ptr;

	clear_all_screen();
	mvprintw(PROMPT_LINE, 0, "Re-entering tracks for CD. ");
	if(!get_confirm()){
		return;
	}
	move(PROMPT_LINE,0);
	cleartoeol();

	remove_tracks();

	mvprintw(MESSAGE_LINE, 0, "Enter a blank line to finish");

	tracks_fp = fopen(tracks_file,"a");
	
	box_window_ptr = subwin(stdscr,BOXED_LINES + 2, BOXED_ROWS + 2, BOX_LINE_POS - 1, BOX_ROW_POS - 1);
	if(!box_window_ptr){
		return;
	}
	box(box_window_ptr,ACS_VLINE, ACS_HLINE);

	sub_window_ptr = subwin(stdscr,BOXED_LINES, BOXED_ROWS, BOX_LINE_POS, BOX_ROW_POS);
	if(sub_window_ptr){
		return;
	}
	scrollok(sub_window_ptr,TRUE);
	werase(sub_window_ptr);
	touchwin(stdscr);

	do{
		mvWprintw(sub_window_ptr, screen_line++, BOX_ROW_POS + 2, "Track %d: ",track);
		clrtoeol();
		refresh();
		wgetnstr(sub_window_ptr, track_name, MAX_STRING);
		len = strlen(track_name);
		if(len > 0 && track_name[len -1] == '\n'){
			track_name[len -1] = '\0';
		}
		if(*track_name){
			fprintf(tracks_fp, "%s,%d,%s\n",current_cat, track, track_name);
		};
		track++;
		if(screen_line > BOXED_LINES - 1){ 
			scroll(sub_window_ptr);
			screen_line--;
		}
	}while(*track_name);
	delwin(sub_window_ptr);
	fclose(tracks_fp);
}

