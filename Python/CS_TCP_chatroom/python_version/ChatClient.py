from Login import *
from bk_form import *
from Receive import *
import thread 


class ChatClient(Frame):
    def __init__(self,parent=None):
        Frame.__init__(self, parent)
        self.pack(side=RIGHT, expand=YES, fill=BOTH)       # make me expandable
        self.clientInfo = {}
        self.socketInfo = {}
        self.makewidget()
        self.logIn = False
        #self.lock = thread.allocate_lock()
        thread.start_new(self.start,())
    def makewidget(self):        
        #back ground information gui: client list online and chatting info
        bkInfo = Form(self)
        #clientList instance, used for update
        self.clientList = bkInfo.sClientList
        self.text= bkInfo.sInfoText
        frm = Frame(self)
        frm.pack(side=BOTTOM,expand=YES,fill=X)
        sendEnt = Entry(frm)
        sendBt = Button(frm,text='Send',command=self.onSend)
        #variable on for message sending entry
        msgSendVar = StringVar()
        sendEnt.config(textvariable = msgSendVar)
        msgSendVar.set('message to send')
        self.msgSend = msgSendVar
        sendBt.pack(side=RIGHT)
        sendEnt.pack(side=LEFT,expand=YES,fill=X)
        self.rootWin = root
        #root.mainloop()
    def start(self):
        logFlag = self.logIn
        while not logFlag:
            logFlag = self.logIn
        rThread = Receive(attachingChatClient = self, connSocket = self.socketInfo)
        rThread.start()
    def onSend(self):
        #print "not implemented yet"
        content = self.msgSend.get()
        #postPeopleIndex = self.clientList.listbox.curselection()
        postPeople = self.clientList.listbox.get(ACTIVE)
        if (not postPeople) or (not cmp("",postPeople)) or (not cmp("all online",postPeople)):
            self.text.text.insert('end',"[" + self.clientInfo["nickname"].get() + "]" + " broadcasting:" + content + "\n")
        else:
            self.text.text.insert('end',"[" + self.clientInfo["nickname"].get() + "] " + content + "\n")
        #send message to network over socket
        posMsg = "70!@~`"+ self.clientInfo["nickname"].get() + "!@~`" + postPeople + "!@~`" + content+"!@~`O"+CRLF
        self.socketInfo["outputstream"].write(posMsg)
        #clear send entry
        self.msgSend.set('')
        

def onQuit(chatClientInstance):
    #write leaving message
    chatClientInstance.socketInfo["outputstream"].write("90!@~`"+"SYSTEM!@~`EXIT!@~`"+chatClientInstance.clientInfo["nickname"].get() +"!@~`O"+CRLF)
    chatClientInstance.master.quit()

def waitLogin(cc,root):
    #wait until a successful log in
    #do not support thread update, thus here have global variable
    global waitLoginV
    global title_string
    global ccInstance
    exit = cc.logIn
    while not exit:
        exit = cc.logIn
    title_string = cc.clientInfo["nickname"].get()
    ccInstance = cc
    waitLoginV = True
    print "Exit WaitLogin thread......"
    
    
#decorating window whenever logged in
def decorate(rootWin,string,variable,afterhandle=None): 
    #log in, set window
    if variable:
        rootWin.title(string)
        rootWin.protocol('WM_DELETE_WINDOW',lambda cc = ccInstance : onQuit(cc))
    #doesn't log in, continue to wait "thread"
    else:
        #attention: here have 2 global variales
        afterhandle = rootWin.after(10,decorate,root,title_string,waitLoginV,afterhandle)

#
def quitCallback():
    if askyesno('Verify','Do you want to quit program?'):
        sys.exit()
    else:
        pass



if __name__ == '__main__':
    global waitLoginV
    global title_string
    global ccInstance
    title_string = "ChatClient"
    waitLoginV = False
    root = Tk()
    logInWin = Toplevel()
    root.title(title_string)
    cc = ChatClient(root)
    #login window
    logInWin.lift(root)        #lower root window so to process log in
    #root.lower(logInWin)
    logInWin.title('Log in')
    #login form
    logBox(logInWin,cc)
    #logInwin.pack(): packed already
    #loginFrm.pack()
    logInWin.focus_set() 
    logInWin.grab_set()
    #ignor the windows destruction. Quit on "Exit" button
    logInWin.protocol('WM_DELETE_WINDOW',quitCallback)
    #listen to login event, once login, configure GUI
    thread.start_new(waitLogin,(cc,root))
    decorate(root,title_string,waitLoginV)
    root.mainloop()
