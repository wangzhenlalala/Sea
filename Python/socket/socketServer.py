# from  socketserver  import TCPServer, StreamRequestHandler
# class Handler(StreamRequestHandler):
#     def handle(self):
#         addr = self.request.getpeername()
#         print('Got connection from: ', addr)
#         self.wfile.write('Thank you from connecting')

# server = TCPServer( ("", 5000), Handler)
# server.serve_forever()

from socketserver import TCPServer, StreamRequestHandler
class Handler(StreamRequestHandler):
    def handle(self):
        addr = self.request.getpeername()
        print('Got connection from', addr)
        self.wfile.write('Thank you for connecting')
server = TCPServer(('', 1234), Handler)
server.serve_forever()

'''
    fork
    thread
    asynchronous I/O
'''