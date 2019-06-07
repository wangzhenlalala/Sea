from Tkinter import *
import sys
from socket import *
from utility import DataOutputStream,DataInputStream,get_lan_ip
from tkMessageBox import *



CRLF = "\r\n"

#log box can be a class;
#here implemented using Tkinter variable control
class logBox(Frame):
    def __init__(self,parent=None,chatclient=None):
        Frame.__init__(self,parent)
        #varList format: [$IP,$Nickname,$Password],debatablly could use dictionary
        self.varList = {}
        #hold socket info
        self.soketDict = {}
        self.makeLoginForm()
        self.attachingChatClient = chatclient
    def makeLoginForm(self):       
        #IP field
        lIP = Label(self,text = 'Chat Server IP:')     # Entry field for IP
        entIP = Entry(self,relief = RIDGE)                        
        varIP = StringVar()
        entIP.config(textvariable = varIP)
        varIP.set('localhost')                              #Initialized to localhost
        self.varList["serverhost"] = varIP
        #user name field
        lNick = Label(self,text = 'Log in as:')        # Label for log_in nickname
        entNick = Entry(self,relief = RIDGE)           # Entry filed for log_in nickname
        varNick = StringVar()
        entNick.config(textvariable = varNick)
        self.entNick = entNick
        self.varList["nickname"]= varNick
        #password field
        lPW = Label(self,text = 'Password:')           # Label for login password
        entPW = Entry(self,show = '*',relief = RIDGE)  # Entry field for log_in password
        varPW = StringVar()
        entPW.config(textvariable = varPW)
        self.entPW = entPW
        self.varList["password"] = varPW
        #log in button
        loginBt = Button(self,text = "Log in",command = self.onLoginFunc)
        #exit button
        exitBt = Button(self,text = "Exit",command = sys.exit)
        #pack,lay all the widgets out in a line
        self.pack(expand = YES, fill = BOTH)
        lIP.pack(side = LEFT)
        entIP.pack(side = LEFT,expand = YES,fill=X)
        lNick.pack(side = LEFT)
        entNick.pack(side = LEFT,expand = YES,fill=X)
        lPW.pack(side = LEFT)
        entPW.pack(side = LEFT,expand = YES,fill=X)
        loginBt.pack(side = LEFT,expand = YES,fill=Y)
        exitBt.pack(side = LEFT,expand = YES,fill=Y)    
    #event for "Log in" button
    def onLoginFunc(self):
        from tkMessageBox import showinfo,showerror
        s_varList = []
        validated = False
        for i in self.varList.keys():
            s_varList.append(self.varList[i].get())
        #does not allow empty 
        if ('' in s_varList):
            showinfo('Incomplete login info','Please complete login info')
            self.lift()
            self.entNick.focus()
        else:
            #v.set(True)
            #assume on port 9082
            try:
                sockobj = socket(AF_INET,SOCK_STREAM)
                sockobj.connect((self.varList["serverhost"].get(),9082))
                #output stream
                self.dos = DataOutputStream(sockobj)
                self.soketDict["outputstream"] = self.dos
                #input stream
                self.dis = DataInputStream(sockobj)
                self.soketDict["inputstream"] = self.dis
                #by protocol: connection request message
                print 'Sending connection request message....'
                self.sendMsg("10!@~`"+"HELLO!@~`"+get_lan_ip()+"!@~`O"+CRLF)
                #get reply from server regarding connect request
                reply = self.dis.readUTF()
                if (self.parseReply(reply) != 20):
                    raise IOError
		else:
                    print "reply from server "+self.varList["serverhost"].get()+": "+str(self.parseReply(reply))+" OK"
		    #read next reply from server
		    reply = self.dis.readUTF()
		#get reply from server regarding user id authentication			    
                #if not 30 AUTH message
                if (self.parseReply(reply) != 30):
		    raise IOError
		    #else send auth message
		else: 
		    print "reply from server "+self.varList["serverhost"].get()+": "+str(self.parseReply(reply))+" AUTH REQUIRE"
		    self.sendMsg("40!@~`"+self.varList["nickname"].get()+"!@~`"+self.varList["password"].get()+"!@~`O"+CRLF)
		#get the reault of user authentication
                reply = self.dis.readUTF();
                if (self.parseReply(reply) == 50):
                    #authenticate success ,modify
		    print "reply from server "+self.varList["serverhost"].get()+": "+str(self.parseReply(reply))+" AUTH SUCCESS"
		    self.sendMsg("90!@~`"+"SYSTEM!@~`ENTER!@~`"+self.varList["nickname"].get() +"!@~`O"+CRLF)
		    validated = True
		elif(self.parseReply(reply) == 60):
                    #authenticate failed
		    print "reply from server "+self.varList["serverhost"].get()+": "+str(self.parseReply(reply))+" AUTH FAILED"
		    showwarning("Authorization Fail...","Authorization fail,Please input the correct Usr/Passwd")
		else:
		    raise IOError
		
            except:
                print sys.exc_info()[0]
                print sys.exc_info()[1]
                showerror('connecting failed','connecting server failed... (Are you sure server is up?)')
            #raise
            #return value based on validated or not
            
            if (validated):
                #self.destroy()
                #here is a frame, destroy its parent window (successful login)
                self.master.destroy()
                #pass the log_in information back to the attaching ChatClient instance
                self.attachingChatClient.clientInfo = self.varList
                self.attachingChatClient.socketInfo = self.soketDict
                self.attachingChatClient.logIn = True
                return True
            else:
                self.entNick.delete(0, END)
                self.entPW.delete(0, END)
                return False
            
    #event for "Exit" button
    def onExit(self):
        #v.set(True)
        sys.exit()
    def parseReply(self,reply):
        replyArray = reply.split("!@~`")
        return int(replyArray[0])
    def sendMsg(self,msg):
        #pass
        self.dos.write(msg)
        #dos.flush()

def main():
    root = Tk()
    root.title('login')
    logBox(root)
    root.mainloop()


if __name__ == '__main__':
    main()
    
