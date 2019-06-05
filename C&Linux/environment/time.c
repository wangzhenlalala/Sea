#include <stdio.h>
#include <time.h>

int main(){
    time_t start,now;
    struct tm *tm;
    start = time(NULL);
    printf("time is %ld\n",start); // time must have a argument!!!!!

    //double times = 0;
    //while(times < 20){
    //    printf("time goes: %f\n",times);
    //    sleep(1);
    //    now = time((time_t*)0);
    //    times = difftime(now,start);
    //}
    tm = gmtime(&start);
    printf("hour: %d\n",tm->tm_hour);
    printf("minute: %d\n",tm->tm_min);
    printf("second: %d\n",tm->tm_sec);
    
    printf("mktime with gmt");
    now =  mktime(tm);
    printf("time is %ld\n",now); 
    
    printf("\n");
    tm = localtime(&start);
    printf("hour: %d\n",tm->tm_hour);
    printf("minute: %d\n",tm->tm_min);
    printf("second: %d\n",tm->tm_sec);

    printf("mktime with localtime");
    now =  mktime(tm);
    printf("time is %ld\n",now); 
    

    return 0;
}
