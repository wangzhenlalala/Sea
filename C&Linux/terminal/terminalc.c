
#include <stdio.h>
#include <term.h>
#include <ncurses.h>
#include <stdlib.h>

int main(){
	int nrows,ncols;
	char *cursor,*esc_sequence;
	setupterm(NULL,fileno(stdout),NULL);

        ncols=tigetnum("cols");
	nrows=tigetnum("rows");
	printf("\nrow:%d\tcol:%d\n",nrows,ncols);

        cursor=tigetstr("cup");
	esc_sequence=tparm(cursor,10,40);
	putp(esc_sequence);
	return 0;
}
