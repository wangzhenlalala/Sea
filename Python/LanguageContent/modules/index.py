'''
    tell the python interpreter to find your module
    >>> import sys
    >>> sys.path.append("absolute_path/your_module_dir")

    import-only-once !!!! 模块的缓存

    >>> import importlib
    >>> hello = importlib.reload(hello)
'''

def greet():
    print('hello world')


if __name__ == "__main__":
    ## 不是被别的模块import
    ## 而是被当做程序执行
    greet()