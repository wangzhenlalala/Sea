## yield 和 return 的作用的异同

def flatten(nested):
    try:
        for sublist in nested:
            for element in flatten(sublist):
                ##这里的语句会被执行吗 YES
                print('element',element)
                yield element
    except TypeError:
        print('nested', nested)
        yield nested

def error():
        time = 0
        while time < 10:
            try:
                if time % 2 == 0:
                    raise Exception
                else:
                    print(time)
            except:
                    print('no')
            time+=1
# error()

lies = [1,2,[3,4]]
gen = flatten(lies)
for i in gen:
    print('print', i)


##八皇后问题。generator的形式。
def conflict(state, nextX):
    nextY = len(state)
    for i in range(nextY):
        if abs(state[i] - nextX) in (0, nextY - i):
            return True
    return False

def queens(num=8, state=()):
    for pos in range(num):
        if not conflict(state, pos):
           if len(state) == num-1:
               ##base case
              yield (pos,)
           else:
               ##recursive case
              for result in queens(num, state + (pos,)):
                  ## result is only a tuple 
                  ## iterator queens has only one element !!!! 
                  yield (pos,) + result
'''
    1 -> (4,3,2,1)
    2 -> (4,3,2)
    3 -> (4,3)
    4 -> (4,)
    当下一次next(genQueen)的时候， next 应该是从 最深层的yield后面开始执行，不然就是逻辑错误。。。
    也就是所generator function被调用的时候，系统是会 保留其调用的堆栈的，尽管经过一层层的yield。
    也就是说yield是可以穿越调用栈，但是不用回退堆栈的！！！！ 是不是像C语言找那个的 setjump 的作用呢？？？
'''

genQueen = queens(5)
print( next(genQueen) )
print( next(genQueen) )
print( next(genQueen) )
print( next(genQueen) )
print( len( list(genQueen) ) )