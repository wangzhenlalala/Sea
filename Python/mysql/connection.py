import mysql.connector
from mysql.connector import Error
from mysql.connector.cursor import MySQLCursorPrepared


def insert_single(cursor):
    sql_insert_query = '''
        INSERT INTO member
        (name, age, gender) VALUES ('itachi', 25, 'male')
    '''
    cursor.execute(sql_insert_query);


def insert_multiple(cursor):
    ## 如果一个数据库表的字段不传递的时候，具有默认值，如不传递值呢？？？ 
    ## gender是有默认值的，可是如果传递空字符串的话，就不会采用默认值了 
    datas = [
        ('wukong', 22, ""),
        ('bajie', 23, 'female'),
        ('wujing', 24, "")
    ]
    sql_insert_query = '''
        INSERT INTO member (name, age, gender) VALUES (%s, %s, %s)
    '''
    result = cursor.executemany(sql_insert_query, datas)
    print(result)


def select_table(cursor):
    select_query = "SELECT * FROM member LIMIT 5";
    param_select_query = "SELECT * FROM member where gender=%s"
    cursor.execute(param_select_query, ('male',)) # one element tuple
    datas = cursor.fetchall()
    print("Select %d rows" % cursor.rowcount)
    print('here follows the results:')
    print("the type of date is : ", type(datas[0][4])) ## <class 'datetime.datetime'>
    for row in datas:
        print(row)

def exec_procedure(cursor):
    params = (29,0) ## 0 is the OUT value [placeholder] (29, (0, 'CHAR') )
    args = cursor.callproc('get_child', params)  
    stored_results = cursor.stored_results() ## in the procedure , we may select many times
    for result in stored_results:
        ## every result is a cursor object
        rows = result.fetchall()
        print(rows)

    print('result', args)
## here begins the module
try:
    connection = mysql.connector.connect(
        host='localhost',
        database="family",
        user='wangzhen',
        password='wangzhen'
    )
    if connection.is_connected():
        connection.autocommit = false
        # cursor = connection.cursor()
        # insert_single(cursor)

        # cursor = connection.cursor(prepared=True)
        cursor = connection.cursor(cursor_class=MySQLCursorPrepared) ## prepared statement or parameterized query
        # cursor = connection.MySQLCursorPrepared()
        # insert_multiple(cursor)
        # select_table(cursor)
        # exec_procedure(cursor)
        connection.commit()
except Error as e:
    connection.rollback() # #rollback if any exception occured
    print('Error occured while operating on your database', e)
finally:
    if connection.is_connected():
        #closing database connection.
        cursor.close()
        connection.close()
        print('Mysql connection is close. Bye')