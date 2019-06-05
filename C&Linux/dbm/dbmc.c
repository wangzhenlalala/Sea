#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <gdbm-ndbm.h>
#include <fcntl.h>

#define FRIEND_NUM 3

struct friend{
	char name[20];
	int  age;
	char phone[15];
};

int main(){
	struct friend friends[FRIEND_NUM]={"juhua",21,"123456","dashen",22,"181389034",\
	"sanpang",23,"893458940"};		
	struct friend single_friend;
	char key_name[20];
	/*DBM and datum  may be defined by typedef */
	int loop,result;


	DBM *dbm_ptr;
	datum key_datum,data_datum;

	dbm_ptr=dbm_open("temp_dbm",O_RDWR | O_CREAT,0666);

	if(!dbm_ptr){
		printf("something wrong !!!\n");
		perror("error is :");
		exit(EXIT_FAILURE);
	}else
		printf("YES,database opened successfully !!\n");

	//menset(friends,'\0',sizeof(friends));
	
	for(loop=0;loop<FRIEND_NUM;loop++){
		key_datum.dptr=(void *)friends[loop].name;
		key_datum.dsize=strlen(friends[loop].name);
		data_datum.dptr=(void *)&friends[loop];
		data_datum.dsize=sizeof(struct friend);

		result=dbm_store(dbm_ptr,key_datum,data_datum,DBM_REPLACE);
		if(result != 0){
			printf("can't add date to dbm  !!!\n");
			perror("error is :");
			exit(EXIT_FAILURE);

		}else{
			printf("add date: %s to dbm successfully!\n",friends[loop].name);

		}

	}

	printf("please give the key :");
	scanf("%s",key_name);

	key_datum.dptr=key_name;
	key_datum.dsize=strlen(key_name);
	data_datum=dbm_fetch(dbm_ptr,key_datum);

	if(!data_datum.dptr){
		printf("can't get the data !!");	
		perror("error is :");
		exit(EXIT_FAILURE);
	}else{
		printf("data received !!!");
		memcpy(&single_friend,data_datum.dptr,sizeof(struct friend));
		printf("received data is: %s\t%d\t%s\n",\
				single_friend.name,\
				single_friend.age,\
				single_friend.phone);
	}



	exit(EXIT_SUCCESS);
}
