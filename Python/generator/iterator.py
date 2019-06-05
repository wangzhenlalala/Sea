def isPrime(num):
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False 
    return True

class Prime:
        def __init__(self, max):
            self.max = max
            self.number = 1
        def __iter__(self):
            return self 
        def __next__(self):
            self.number+=1
            if self.number >= self.max:
                raise StopIteration
            elif isPrime(self.number):
                return self.number
            else:
                return self.__next__()

# test = Prime(999)
# for i in test:
#     print(i)

## generator style
def GenPrime(max):
    number = 1
    while number < max:
        number+=1
        if isPrime(number):
            yield number

gen_prime = GenPrime(999)
for i in gen_prime:
    print(i)