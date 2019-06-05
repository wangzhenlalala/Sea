#include <unistd.h>
#include <stdio.h>
#include <limits.h>
#ifdef PATH_MAX
static long pathmax = PATH_MAX;
#else
static long pathmax = 0;
#endif

int main(){
    printf("pathmax is: %ld\n",pathmax);
    if(pathmax == 0) pathmax = 1024;
    char buf[pathmax];
    int re;
    getcwd(buf,sizeof(buf));
    printf("%s\n",buf);

    re = chdir("/test/wangzhen");
    if(re < 0){
        printf("sorry change directory failed!!\n");
        return 1;
    }

    getcwd(buf,sizeof(buf));
    printf("%s\n",buf);
    return 0;
}
