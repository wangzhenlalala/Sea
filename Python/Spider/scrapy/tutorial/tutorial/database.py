import mysql.connector
from mysql.connector import Error
from mysql.connector.cursor import MySQLCursorPrepared


class database_model():
    query = '''
        INSERT INTO  quotes (author, quote) VALUES (%s, %s)
    '''
    def __init__(self):
        try:
            self.connection = mysql.connector.connect(
                host= 'localhost',
                database= 'family',
                user= "wangzhen",
                password= 'wangzhen'
            )
            self.connection.autocommit = False 
            if self.connection.is_connected():
                self.cursor = self.connection.cursor()
        except Error as e:
            if self.cursor is not None:
                self.cursor.close()
            self.connection.rollback()

    def addItem(self, item):
        print(item)
        try:
            self.cursor.execute(self.query,(item['author'],item['quote']))
            self.connection.commit()
        except Error as e:
            self.cursor.close()
            self.connection.close()
    
    def close(self):
        if(self.connection and self.connection.is_connected()):
            self.cursor.close()
            self.connection.close()
