

class SomeCustomException(Exception):
    pass

class FristException:
    def learn(self):
        try:
            x = int( input("Enter first number") )
            y = int( input("Enter second number") )
            print( x/y )
        except ZeroDivisionError:
            print("The second number can't be zero")


class MuffledCalculator:
    muffled = False
    def cal(self, expr):
        try:
            return eval(expr)
        except ZeroDivisionError:
            if self.muffled:
                print('Division by zero is illegal')
            else:
                raise  ##will raise the exception it catched
        except TypeError:
            print("That is not a valid number")
        except (KeyError, ValueError) as error:
            ##you can determine the type of error!!! 
            ##就像js的事件委托的回调一样
            print(error)
            print("some message")
        except:
            print("i catch all exceptions left")
        else:
            print("ok! nothing wrong happens. wowowo")
        finally:
            print("to be or not to be , i will always be there!!!!")
            print("I will do some cleaning")