


def deco(func):
    def wrapper(name):
        func(name)
        print "hello ,i am late"
    return wrapper

@deco
def print_name(name):
    print "my name is %s" %name

if __name__ == "__main__":
    name = "wangzhen"
    print_name(name)
