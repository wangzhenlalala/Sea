#include <stdio.h>
#include <stdlib.h>

int main(){
    int c;
    FILE *in,*out;

    in = fopen("./file_in","r");
    out = fopen("./file_out","w");

    while((c = fgetc(in)) != EOF){
        fputc(c,out);
    }
    fprintf(stdout,"\n%d\n",feof(in));
    exit(0);
}
