import threading
from utility import *

CRLF = "\r\n"

class Receive(threading.Thread):     #subclass Thread object
    def __init__(self,attachingChatClient=None,connSocket=None,lock=None):
        self.attachChatClient = attachingChatClient
        self.lock = lock
        try :
            self.connSocket = connSocket
            self.dis = self.connSocket['inputstream']
            #self.dos = DataOutputStream(self.connSocket)	    
            self.isStart = True
        except :
            import sys
            print sys.exc_info()[0],sys.exc_info()[1]
        #raise
        threading.Thread.__init__(self)
    def run(self):
        while(self.isStart):
            try :
                #read input stream
                msg = self.dis.readUTF()
                #print "msg = %s" %msg
                #split data stream in to an array
                tmpMsg = msg.split("!@~`")
                if self.parseReply(msg) == 70:
                    nickname = tmpMsg[1]
                    content = tmpMsg[3]
                    #different actions taken upon broadcast or unicast
                    if (not tmpMsg[2]) or (not cmp("null",tmpMsg[2])) or (not cmp("all online",tmpMsg[2])):
                        self.attachChatClient.text.text.insert('end',"[" + nickname + "]" + " broadcasting:" + content + "\n")
                    else:
                        #print "here in while"
                        self.attachChatClient.text.text.insert('end',"[" + nickname + "]" + content + "\n")
                elif self.parseReply(msg) == 100:
                    actMsg = tmpMsg[1]
                    #split data stream in to an array
                    onlinePeoples = actMsg.split("!#~`")
                    #add new client to list
                    if (len(onlinePeoples) > 1):
                        self.attachChatClient.clientList.listbox.delete(0,'end')
                        for i in range(len(onlinePeoples)):
                            self.attachChatClient.clientList.listbox.insert('end',onlinePeoples[i])
                    else:
                        self.attachChatClient.text.text.insert('end', actMsg + "\n")
            except:
                #import sys
                #print sys.exc_info()[0],sys.exc_info()[1]
                self.isStart= False
                clientName = self.attachChatClient.clientInfo["nickname"].get()
                print "client [%s] thread exception......"%clientName
        #raise

    def parseReply(self,reply):    	
        #tokenize string
        replyArray = reply.split("!@~`")
        #return the reply code (integer)
        return int(replyArray[0])
