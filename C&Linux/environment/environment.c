#include <stdlib.h>
#include <stdio.h>
#include <string.h>

extern char **environ;

int main(int argc,char *argv[]){
    char *key , *value;
    //char *value;
    printf("now print all the environment you have: \n");
    while(*environ){
        printf("%s\n",*environ);
        *environ++;
    }
    printf("done with printing\n");
    if(1 == argc || argc > 3){
        printf("sorry arguments given wrong: accept: one or two \n");
        return 1;
    }
    key = argv[1];
    value = getenv(key);
    if(value){
        printf("%s has value %s\n",key,value);
    }else{
        printf("%s has no value\n",key);
    }
    
    if(3 == argc){
        value = argv[2];
        printf("now set %s = %s\n",key,value);
        char *tmp = malloc( strlen(key) + strlen(value) + 2 );
        if(tmp == NULL){
            printf("sorry out of memory\n");
            return 2;
        }
        strcpy(tmp,key);
        strcat(tmp,"=");
        strcat(tmp,value);

        if(putenv(tmp) != -1){
            value = getenv(key);
            if(value == NULL){
                printf("have you given a null value for %s\n",key);
                return 2;
            }
            printf("%s = %s\n",key,value );
        }
    }
    return 0;
}
