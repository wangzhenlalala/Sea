import sys,os
from socket import *

class DataOutputStream(object):
    """Wraps a stream with an encoder
    """
    def __init__(self, outstream, encoding="utf-8"):
        self.out = outstream
        if not encoding:
            self.encoding = sys.getfilesystemencoding()
        else:
            self.encoding = encoding
    def write(self, obj):
        """Wraps the output stream, encoding Unicode
        strings with the specified encoding"""
        if isinstance(obj, unicode):
            self.out.send(obj.encode(self.encoding))
        else:
            self.out.send(obj)

    def __getattr__(self, attr):
        """Delegate everything but write to the stream"""
        return getattr(self.out, attr)


class DataInputStream(object):
    """Wraps a stream with an encoder
    """
    def __init__(self, instream, encoding="utf-8"):
        self.ins = instream
        if not encoding:
            self.encoding = sys.getfilesystemencoding()
        else:
            self.encoding = encoding
    #wri
    def readUTF (self):
        """Wraps the output stream, encoding Unicode
        strings with the specified encoding"""
        #if isinstance(obj, unicode):
        return self.ins.recv(1024).encode(self.encoding)
        #else:
            #self.ins.read(obj)

    def __getattr__(self, attr):
        """Delegate everything but write to the stream"""
        return getattr(self.out, attr)


# modules/functions for getting the lan ip address of the computer   
def get_interface_ip(ifname):
    import fcntl,struct
    s = socket(AF_INET, SOCK_DGRAM) 
    return inet_ntoa(fcntl.ioctl( s.fileno(), 
                    0x8915,  # SIOCGIFADDR 
                    struct.pack('256s', ifname[:15]) 
                    )[20:24]) 
 
def get_lan_ip():  
    ip = gethostbyname(gethostname()) 
    if ip.startswith("127.") and os.name != "nt": 
        interfaces = ["eth0","eth1","eth2","wlan0","wlan1","wifi0","ath0","ath1","ppp0"] 
        for ifname in interfaces: 
                try: 
                    ip = get_interface_ip(ifname) 
                    break; 
                except IOError: 
                    pass  
    return ip 


if __name__ == '__main__':
    #this won't work on english only windows system
    import sys
    from cStringIO import StringIO as si
    print "testing stream wrapper......"
    out = si()
    #print sys.getfilesystemencoding()
    nihongo = unicode("日本語","utf-8")
    try:
        try:
            print >> out, nihongo
        except:
            print sys.exc_info()[0]
            print sys.exc_info()[1]
    finally:
        print "after encoding......"
        out = DataOutputStream(out,"utf-8")
        print >> out, nihongo
        val = out.getvalue()
        print val.decode("utf-8")
    print "testing localhost ip function......"
    print get_lan_ip()
    #print nihongo
        

