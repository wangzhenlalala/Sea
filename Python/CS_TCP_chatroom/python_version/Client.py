#this module was invoked by ChatServer
import threading,time
from utility import *

CRLF = "\r\n"

class Client(threading.Thread):     #subclass Thread object
    def __init__(self,attachingChatServer=None,connSocket=None,lock=None):
        self.attachServer = attachingChatServer
        self.lock = lock
        try :
            self.connSocket = connSocket
            self.dis = DataInputStream(self.connSocket)
            self.dos = DataOutputStream(self.connSocket)	    
            self.isStart = True
        except IOError:
            import sys
            print sys.exc_info()[0],sys.exc_info()[1]
        #raise
        threading.Thread.__init__(self)
    def run(self):
        #furthur implemenation
        try :
            while(self.isStart):
                msg = self.dis.readUTF()
                #print msg
                tmpMsg = msg.split("!@~`")
                if self.parseReply(msg) == 10:
                    self.dos.write("20!@~`"+get_lan_ip()+"!@~`HELLO!@~`"+tmpMsg[2]+"!@~`O"+CRLF)
                    #send authentication require message
                    self.dos.write("30!@~`"+"AUTH!@~`"+tmpMsg[2]+"!@~`O"+CRLF)
                #authenticate user log-in infomation
                elif(self.parseReply(msg) == 40):
                    user,password = tmpMsg[1],tmpMsg[2]
                    logFile = open('loginfo.txt','r')
                    found = False
                    while logFile:
                        line = logFile.readline()
                        if not line:
                            break
                        authen = line.split("##")
                        usr_a = authen[0]
                        pw_str = authen[1]
                        if (cmp(user,usr_a) == 0) and (cmp(password,pw_str) == 0):
                            found = True
                            break
                        #vip function
                        #if(len(authen) == 3):
                            #self.vip = True
                    #multiple login is forbidden!!!
                    if found and (not self.attachServer.clientDict.has_key(user)):
                        #match, send message type 60
                        self.dos.write("50!@~`"+"AUTH-SUCCESS!@~`"+user+"!@~`O"+CRLF)
                    else:
                        #here, might be multiple login.
                        self.dos.write("60!@~`"+"AUTH-FAILED!@~`"+user+"!@~`O"+CRLF)
                #whenever potential race presents, use lock
                #if length is three, is from online client
                #type 70 is normal message between clients (by protocol)
                elif(self.parseReply(msg) == 70):
                    nickname = tmpMsg[1]
                    content = tmpMsg[3]
                    #broadcast to all the message
                    #note: by default,message is broadcasted
                    if (not tmpMsg[2]) or (tmpMsg[2] == None) or (tmpMsg[2] == "all online"):
                        self.lock.acquire()
                        for key in self.attachServer.clientDict.keys():
                            clientInstance = self.attachServer.clientDict[key]
                            if(self.dos != clientInstance.dos):
                                self.send(clientInstance.dos,msg)
                        self.lock.release()
                        self.attachServer.bkInfo.sInfoText.text.insert('end',"["+ nickname +"]" + " broadcasting: " + content + "\n")
                    #unicast to specified client
                    else:
                        self.lock.acquire()
                        clientInstance = self.attachServer.clientDict[tmpMsg[2]]
                        self.send(clientInstance.dos,msg)
                        self.attachServer.bkInfo.sInfoText.text.insert('end',"["+ nickname +"] to " + "[" + tmpMsg[2] + "]" + ":" + content + "\n")
                        self.lock.release()
                #system message (by protocol, type 90, ex: Client Log in/Log out)
                elif(self.parseReply(msg) == 90):
                    #split data stream in to an array
                    sysMsg = msg.split("!@~`")
                    #generate a monitor message on server side window for some purpose
                    monitorMsg = "100!@~`"
                    #equivalence:(if sysMsg == "SYSTEM")
                    if not cmp(sysMsg[1],"SYSTEM"):
                        #equivalence:if ("ENTER".equals(sysMsg[2]))
                        if not cmp(sysMsg[2],"ENTER"):
                            #here needs to clear string
                            onlinePeoples = ""
                            self.nickname = sysMsg[3]
                            #something
                            self.lock.acquire()
                            #update client container in ChatServer
                            self.attachServer.clientDict[user]= self
                            #update GUI
                            self.attachServer.bkInfo.sClientList.listbox.insert('end',user)
                            self.lock.release()
                            #if vip customer, give broadcast capability
                            #if self.vip:
                                #add all online for broadcast
                            onlinePeoples = "100!@~`" + "all online"
                            #else:
                                #no vip, can not broadcast
                                #onlinePeoples = "100!@~`"
                            self.lock.acquire()
                            for i in self.attachServer.bkInfo.sClientList.listbox.get(0,'end'):
                                onlinePeoples += "!#~`" + i
                            #onlinePeoples += CRLF
                            #send updated client list to every client online
                            for key in self.attachServer.clientDict:
                                clientInstance = self.attachServer.clientDict[key]
                                self.send(clientInstance.dos,onlinePeoples)
                            self.lock.release()
                            monitorMsg += "[" + self.nickname +"]" + " entering "
                        #equivalence: else if ("EXIT".equals(sysMsg[2]))
                        elif not cmp(sysMsg[2],"EXIT"): 
                            #log out
                            #delete the client who is leaving from GUI
                            #locate the leaving client item in list box
                            onlinePeoples = ""
                            self.nickname = sysMsg[3]
                            self.lock.acquire()
                            pos = 0
                            for label in self.attachServer.bkInfo.sClientList.listbox.get(0,'end'):
                                if not cmp(sysMsg[3],label):
                                    break
                                else:
                                    pos += 1
                            #actual delete (GUI)
                            self.attachServer.bkInfo.sClientList.listbox.delete(pos)
                            #construct new online clientlist message
                            onlinePeoples = "100!@~`" + "all online"
                            for label in self.attachServer.bkInfo.sClientList.listbox.get(0,'end'):
                                onlinePeoples += "!#~`" + label
                            #onlinePeoples += CRLF
                            #send updated client list to every client online
                            for key in self.attachServer.clientDict:
                                clientInstance = self.attachServer.clientDict[key]
                                self.send(clientInstance.dos,onlinePeoples)
                            self.lock.release()
                            monitorMsg += "[" + self.nickname +"]" + " exiting "
                    monitorMsg += " chatroom "
                    #get actuall message shown on server window(not message sending to socket)
                    actMsg = monitorMsg.split("!@~`");
                    #server shows the log in/out information in text box
                    time.sleep(1)
                    self.lock.acquire()
                    self.attachServer.bkInfo.sInfoText.text.insert('end',actMsg[1] + "\n")
                    for key in self.attachServer.clientDict:
                        clientInstance = self.attachServer.clientDict[key]
                        self.send(clientInstance.dos,monitorMsg)
                    self.lock.release()
############################################################################################
        #more protocol message format goes here (in elif)
        except:
            import sys
            self.isStart= False
            clientName = None
            for key in self.attachServer.clientDict.keys():
                if self.attachServer.clientDict[key] == self:
                    clientName = key
                    del self.attachServer.clientDict[key]
                    break
##            pos = 0
##            for label in self.attachServer.bkInfo.sClientList.listbox.get(0,'end'):
##                if not cmp(sysMsg[3],label):
##                    break
##                else:
##                    pos += 1
##                    #actual delete
##            self.attachServer.bkInfo.sClientList.listbox.delete(pos)
            print sys.exc_info()[0],sys.exc_info()[1]
            if clientName:
                print "client [%s] thread exit......"%clientName
            else:
                print "client [Unknown] thread exit......"
        #raise
                            
    def parseReply(self,reply):
        replyArray = reply.split("!@~`")
        return int(replyArray[0])

    def send(self,dos,msg):
        try:
            dos.write(msg)
            #dos.flush()
        except:
            import sys
            print sys.exc_info()[0],sys.exc_info()[1]
    
