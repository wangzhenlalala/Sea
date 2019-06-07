from Tkinter import * 

#scrolled list
class ScrolledList(Frame):
    def __init__(self, options=[], parent=None):
        Frame.__init__(self, parent)
        self.pack(side=RIGHT, expand=YES, fill=BOTH)       # make me expandable
        self.makeWidgets(options)
    def handleList(self, event):
        index = self.listbox.curselection()               # on list double-click
        label = self.listbox.get(index)                   # fetch selection text
        self.runCommand(label)                            # and call action here
    def makeWidgets(self, options):                       # or get(ACTIVE)
        sbar = Scrollbar(self)
        list = Listbox(self, relief=SUNKEN)
        sbar.config(command=list.yview)                   # xlink sbar and list
        list.config(yscrollcommand=sbar.set)              # move one moves other
        sbar.pack(side=RIGHT, fill=Y)                     # pack first=clip last
        list.pack(side=LEFT, expand=YES, fill=BOTH)       # list clipped first
        pos = 0
        for label in options:                             # add to list-box
            list.insert(pos, label)                       # or insert(END,label)
            pos = pos + 1
       #list.config(selectmode=SINGLE, setgrid=1)         # select,resize modes
        list.bind('<Double-1>', self.handleList)          # set event handler
        self.listbox = list
    def runCommand(self, selection):                      # redefine me lower
        print 'You selected:', selection


#scrolled Text
class ScrolledText(Frame):
    def __init__(self, parent=None, text='', file=None):
        Frame.__init__(self, parent)
        self.pack(side = LEFT, expand=YES, fill=BOTH)  # make me expandable
        self.makewidgets()
        self.settext(text, file)
    def makewidgets(self):
        sbar = Scrollbar(self)
        text = Text(self, relief=SUNKEN)
        sbar.config(command=text.yview)                  # xlink sbar and text
        text.config(yscrollcommand=sbar.set)             # move one moves other
        sbar.pack(side=RIGHT, fill=Y)                    # pack first=clip last
        text.pack(side=LEFT, expand=YES, fill=BOTH)      # text clipped first
        self.text = text
    def settext(self, text='', file=None):
        if file: 
            text = open(file, 'r').read()
        self.text.delete('1.0', END)                     # delete current text
        self.text.insert('1.0', text)                    # add at line 1, col 0
        self.text.mark_set(INSERT, '1.0')                # set insert cursor
        #self.text.focus()                                # save user a click
    def gettext(self):                                   # returns a string
        return self.text.get('1.0', END+'-1c')           # first through last

class Form(Frame):
    def __init__(self,parent=None):
        Frame.__init__(self,parent)
        self.pack(expand=YES,fill=BOTH)
        self.makewidgets()
    def makewidgets(self):
        sClientList = ScrolledList(parent=self)
        sInfoText = ScrolledText(parent=self)   #parent!! default: option?
        #self.sInfoText.config(side=LEFT)        #not working
        self.sInfoText = sInfoText
        self.sClientList = sClientList
        

if __name__== '__main__':
    root=Tk()
    root.title("experiment")
    frm = Form(root)                               #Resize problem : fixed
    #ScrolledList(parent=root)
    #ScrolledText(parent=root)
    root.mainloop()
        
        
