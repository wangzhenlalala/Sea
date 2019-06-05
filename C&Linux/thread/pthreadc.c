#include<stdio.h>
#include<pthread.h>
#include<string.h>
#include<stdlib.h>
struct easy{
	char* husband; 
	char* wife;
};
void printinfo(struct easy* p){
	puts(p->husband);
	puts(p->wife);
	return;
}

void* pfn(void *arg){
//	struct easy my = {"wangzhen","fanghua"};
	struct easy* my =(struct easy*)malloc(sizeof(struct easy));
	my->husband="wangzhen";
	my->wife="fanghua";
	printinfo(my);
	printf("hello i am exiting\n");
	pthread_exit((void*)my);
}

int main(){
	pthread_t tid;
	void *temp;
	printf("hi ,iam caller thread\n");
	pthread_create(&tid,NULL,pfn,NULL);
	pthread_join(tid,(void*)&temp);
	printinfo((struct easy*)temp);
	return 0;
}
