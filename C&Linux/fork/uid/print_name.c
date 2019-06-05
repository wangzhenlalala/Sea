#include <stdio.h>
#include<string.h>
#include<pwd.h>

int main(){
	struct passwd* item = NULL;
	item = getpwuid(getuid());
	puts(item->pw_name);
	printf("length is %d\n",strlen(item->pw_name));
	return 0;
}
