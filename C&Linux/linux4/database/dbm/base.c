#include <unistd.h>
#include <fcntl.h>
#include <stdio.h>
#include <gdbm.h>
#include <stdlib.h>

#include <string.h>

#define TEST_DB_FILE "./dbm1_test"
#define ITEMS_USED (3)

struct test_data {
    char misc_chars[15];
    int any_integer;
    char more_chars[21];
};

void literate_dbm(GDBM_FILE );
int store_dbm(GDBM_FILE); //funtion prototype declaration must be identical to its definition
int count_dbm(GDBM_FILE);

int main(){
    GDBM_FILE dbm_ptr; // this is NOT GDBM_FILE * dbm_ptr
    // GDBM_FILE gdbm_open (const char * name , int block_size , intflags , int mode , void (*fatal func)(const char *))
   //GDBM_WRITER | GDBM_NEWDB 
    // dbm_ptr = gdbm_open(TEST_DB_FILE, 0, GDBM_WRCREAT, 0666, NULL);
     dbm_ptr = gdbm_open(TEST_DB_FILE, 0, GDBM_READER, 0666, NULL);

    if(!dbm_ptr){
        printf("Failed to open database\n");
        exit(2);
    }
    printf("Opened database successfully\n");
    
    // store_dbm(dbm_ptr);
    // count_dbm(dbm_ptr);
    literate_dbm(dbm_ptr);
    count_dbm(dbm_ptr);
    gdbm_close(dbm_ptr); //returns null; but how can we handle close error? in the function fatal_vfunc passed to gdbm_open ???
    printf("close the database !\n");
    return 0; 
}

void literate_dbm(GDBM_FILE db_ptr){
    //the db_ptr must be opened already!!!
   datum key_datum;
   datum data_datum;
   datum next_key_datum;

   int total_items = 0;
   key_datum = gdbm_firstkey(db_ptr);
   while(key_datum.dptr){
    //    data_datum = gdbm_fetch(db_ptr,key_datum);
    //     if(data_datum.dptr == NULL){
    //         if(gdbm_errno == GDBM_ITEM_NOT_FOUND){
    //             printf("fetch data failed: %s\n",gdbm_strerror(gdbm_errno));
    //             exit(3);
    //         }else{
    //             printf("something unexpected happend %s\n",gdbm_strerror(gdbm_errno));
    //             exit(4);
    //         }
    //     }
    //     free(data_datum.dptr);
        
        // free(key_datum.dptr); //can not free it before we pass it to gdbm_nextkey,!!!!! it will be null ,no way to get the key !!1
        next_key_datum = gdbm_nextkey(db_ptr,key_datum);
        free(key_datum.dptr);
        key_datum = next_key_datum;
        total_items++;
   }
   if(gdbm_errno != GDBM_ITEM_NOT_FOUND){ 
       fprintf(stderr,"failed on literating dababase!!!\n");
       fprintf(stderr,"\n%s\n",gdbm_strerror(gdbm_errno));
       exit(5);
   }
   printf("literate got %d items\n",total_items);
}

int store_dbm(GDBM_FILE dbm_ptr){
    struct test_data items_to_store[ITEMS_USED];
    datum key_datum;
    datum data_datum;
    char key_to_use[20];
    int i, result;
   
    memset(items_to_store,'\0',sizeof(items_to_store) );
    strcpy(items_to_store[0].misc_chars,"First");
    items_to_store[0].any_integer = 21;
    strcpy(items_to_store[0].more_chars,"More First");

    strcpy(items_to_store[1].misc_chars,"Second");
    items_to_store[1].any_integer = 22;
    strcpy(items_to_store[1].more_chars,"More Second");

    strcpy(items_to_store[2].misc_chars,"Third");
    items_to_store[2].any_integer = 23;
    strcpy(items_to_store[2].more_chars,"More Third");

    for(i=0; i<ITEMS_USED; i++){
        sprintf(
           key_to_use,
           "%c%d%c",
           items_to_store[i].misc_chars[0],
           items_to_store[i].any_integer,
           items_to_store[i].more_chars[0]
        );
        key_datum.dptr = key_to_use;
        key_datum.dsize = strlen(key_to_use);
        data_datum.dptr = (void *)&items_to_store[i];
        data_datum.dsize = sizeof( struct test_data);

        result = gdbm_store(dbm_ptr,key_datum,data_datum,GDBM_REPLACE);
        if(result != 0){
            printf("sorry store date error on key %s \n!!",key_to_use);
            return 1;
        }
    }
    return 0;
}

void fetch_dbm(GDBM_FILE db_ptr,char *key){
    //strcpy(key_to_use,"F21M");
    // strcpy(key_datum.dptr,"F21M");
    // key_datum.dsize = strlen(key_datum.dptr);
    // data_datum = gdbm_fetch(dbm_ptr,key_datum);
    // if(data_datum.dptr == NULL){
    //     if(gdbm_errno == GDBM_ITEM_NOT_FOUND){
    //         printf("fetch data failed: %s\n",gdbm_strerror(gdbm_errno));
    //         exit(3);
    //     }else{
    //         printf("something unexpected happend %s\n",gdbm_strerror(gdbm_errno));
    //         exit(4);
    //     }
    // }
    // memcpy(&temp_item,data_datum.dptr,data_datum.dsize);
    // printf("fetch data for key [F21M]: \n");
    // printf("\t%s\n",temp_item.misc_chars);
    // printf("\t%d\n",temp_item.any_integer);
    // printf("\t%s\n",temp_item.misc_chars);
    // free(data_datum.dptr); //the data returned from gdbm is stored in the memory allocted by malloc,so don't forget to release the memory!!!

}

int count_dbm(GDBM_FILE dbm_ptr){
    gdbm_count_t count;
    gdbm_count(dbm_ptr,&count);
    printf("\ngdbm_count got %d items\n",(int)count);
    return count;
}

