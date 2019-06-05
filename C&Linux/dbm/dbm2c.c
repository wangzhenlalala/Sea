
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <gdbm-ndbm.h>
#include <fcntl.h>


struct friend{
	char name[20];
	int  age;
	char phone[15];
};

int main(){

	DBM *dbm_ptr;
	datum key_datum,data_datum;
	struct friend single_friend;
	char key_name[20];

//different program can access the data by specifying the exact path of the data.

	dbm_ptr=dbm_open("/home/wangzhen/my-c/dbm/temp_dbm",O_RDWR );

	if(!dbm_ptr){
		printf("something wrong !!!\n");
		perror("error is :");
		exit(EXIT_FAILURE);
	}else{
		printf("YES,database opened successfully !!\n");
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
// use dbm_delete() to delete the data by key_datum;
// dbm_delete(dbm_dptr,key_datum);
// retruns 0 if succeed





//use  dbm_firstkey() and dbm_nextkey() to look through the datas

	printf("\nall datas are listed below:\n");
	for(key_datum=dbm_firstkey(dbm_ptr);key_datum.dptr;key_datum=dbm_nextkey(dbm_ptr)){

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
		
	}
	exit(EXIT_SUCCESS);
}
