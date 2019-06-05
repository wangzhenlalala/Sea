#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char** argv){
    int opt;
    opterr=0;
    while((opt = getopt(argc,argv,":n:a")) != -1){
        switch(opt){
            case 'n':
                printf("your name is : %s\n",optarg);
                break;
            case 'a':
                printf("add you\n");
                break;
            case '?':
                printf("unknow %c\n",optopt);
                break;
            case  ':':
                printf("%c missing argument\n",optopt);
                break;
            default: 
                break;
        }
    }
    if(optind < argc) printf("rest argument:\n");
    while(optind < argc){
        printf("%s\n",argv[optind]);
        optind++;
    }
    return 0;
}
