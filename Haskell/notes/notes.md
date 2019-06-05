* Function Application has highest Precedence
* in the prompt : 
    * :l filename
    * :cd your_file_dir
    * :load baby
    * :reload baby
* if condition then consequence else alternative
    * **if is an expression and not a statement**
    * **else part is mandatory**
* Me = "wangzhen"
    * is a function with no parameters
    * is called a definition
* function name can't start with capital letter

# List

* list is homogenous 
* using let keyword to defined a NAME, and that will be defined inside  GHC, not in a script 

* append to list [1,3,3] ++ [2,3,4] => **list** ++ list
    * **Haskell has to walk through the whole list on the left side of ++.**
* prepend **ele** : list
* sparse an element:  list !! index (from 0)
* list can contain lists, but **child list must contain elements of the same type**
* list can be compared if the elements they hold can be compared</br>
    [1,2,3] <= [2]
* head last => element
* init tail => elements but one
* head [] will cause an error
* length list
* null list => to check whether list is empty
* reverse list
* take number list : take number elements from beginning
* drop numberlist
* maximum list
* minimun list
* sum list
* product list
* elem element list : to check whether element is in list
***
* ranges
    * [1..23]
    * ['a'..'k']
    * [start,[next..upper_limit]] => next - start == step
    * take 24 [2,6..] : infinite list but haskell is lazy
* cycle times list
    * cycle 3  [1,3] => [1,3,1,3,1,3]
* repeat times element => list
    * repeat 3 3 => [3,3,3]
***
* list comprehension vs **set comprehension**
    * ![set comprehension](./images/setnotation.png)
        1. output function
        2. input se
        3. predicate

    * [output_function | ele <- input_list_1, ele2 <- input_list_2, predicate1, predicate2,predicate3]

# Tuple
> A list of numbers is a list of numbers. That's its type and it doesn't matter if it has only one number in it or an infinite amount of numbers. Tuples, however, are used when you know exactly how many values you want to combine and its type depends on how many components it has and the types of the components. They are denoted with parentheses and their components are separated by commas.</br> Another key difference is that they  don't have to be homogenous . Unlike a list, a tuple can contain a combination of several types.

* [(1,2),(8,11),(4,5)] is ok 
* [(1,2),(8,11,3),(4,5)] is error
* [(1,2),(8,"11"),(4,5)] is error
* ("wangzhen", 24, True):a valid tuple
* fst  tuple:first
* snd  tuple: second

## This is a common pattern in functional programming. You take a starting set of solutions and then you apply transformations to those solutions and filter them until you get the right ones.