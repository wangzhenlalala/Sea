#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

char *choices[] = {
    "a - add new record",
    "d - delete record",
    "q - quit",
    NULL
};

int getChoice(char *greet,char** choices,FILE *in,FILE *out){
    char **options;
    char choice;
    int flag = 0;
    fprintf(out,"choice: %s\n",greet);
    do{
        options = choices;
        while(*options){
            fprintf(out,"\t%s\n",*options);
            options++;
        }


        do{
            choice = fgetc(in);
        }while(choice == '\n');

        options = choices;
        while(*options){
            if(choice == **options){
                flag = 1;
                break;
            }
            options++;
        }
        if(!flag){
            fprintf(out,"sorry wrong choice\n");
        }
    }while(!flag);
    return choice;

}

int main(){
    int choice;
    FILE *in,*out;

    if(!isatty(fileno(stdout))){
        fprintf(stderr,"sorry you are not a terminam,bye\n");
    }

    in = fopen("/dev/tty","r");
    out = fopen("/dev/tty","w");
    if(!in || !out){
        fprintf(stderr,"sorry can't open /dev/tty\n");
        exit(2);
    }

    do{
        choice = getChoice("please select your choice",choices,in,out);
        printf("you selected %c\n",choice);
    }while( choice != 'q');
    return 0;
}
