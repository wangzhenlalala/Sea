add a b = a + b

myDrop n xs = if n <= 0 || null xs
              then xs
              else myDrop (n - 1) (tail xs)

data BookInfo = Book Int String [String]
                deriving (Show)

type CustomerId = Int
type ReviewBody = String
data BookReview = BookReview BookInfo CustomerId ReviewBody

-- a type synonym creates onlu a new name that refers to an existing type
type BookRecord = (BookInfo, BookReview)

myinfo = Book 123 "Gone with wind" ["Wangzhen", "Fanghua"]

-- pattern matching 
-- construction and deconstruction
myNot :: Bool -> Bool
myNot True = False
myNot False = True

third (a, b, c) = c

-- wild card
bookId (Book id _ _) = id
bookReviewBody (Book _ body _) = body
bookReview (Book _ _ review) = review

-- exhaustive patterns
badExample (x:xs) = x badExample xs
badExample _      = 0ßß

-- record syntax
-- write accessor functions for each of a data type's components

data Customer = {
    customerId :: Int,
    customerName :: String,
    customerAddress :: [String]
} deriving(Show)

-- components order is strict
customer1 = Customer 1 "wangzhen" ["hefei"]

-- components order is loss 
customer2 = Customer {
    customerId = 2,
    customerAddress = ["hefei"],
    customerName = "fanghua",
}

-- accesors automatically created by haskell
customer1_name = customerId customer1
customer2_id = customerId customer2

-- parameterized types
-- generic type
data MyMaybe a = Just a
                | Nothing
                deriving(Show)
maybeA = Just "wangzhen"
maybeB = Just 33

-- recursive types
data List a = Cons a (List a)
            | Nil
            deriving(Show)

zero = Nil
one = Cons 1 zero
two = Cons 2 one

-- binary tree
data BTree a = Node a (Tree a) (Tree a)
             | Empty
             deriving(Show)
empty_tree = Empty
first_tree = Node "first" Empty Empty


-- error :: String -> a
mySecond xs = if null (tail xs)
              then error "arguments too short"
              else head (tail xs)

-- error with Maybe
safeSecond :: [a] -> Maybe a
safeSecond [] = Nothing
safeSecond xs = if null (tail xs)
                then Nothing
                else Just (head (tail xs))

tidySecond :: [a] -> Maybe a
tidySecond (_:x:_) = Just a
tidySecond _       = Nothing


-- offset rules and identation
-- local variable

-- let
lend account balance = let reserve = 100
                           newBalance = balance - account
                       in if newBalance < reserve
                          then Nothing
                          else Just newBalance

-- where
lend2 account balance = if account < reserve * 0.5
                        then Just newBalance
                        else Nothing
                        where reserve = 100
                              newBalance = balance - account

-- attation let and where 
-- a name in a let block is bound to an expression, not to a value. haskell is lazy



-- case expression
fromMaybe defaultVal wrapped = case wrapped of
                                    Nothing -> defaultVal
                                    Just a  -> a
-- a and defaultVal must be the same type
-- we can use wild card in case of


-- A name can appear only once in a set of pattern bindings.
-- bad_nodesAreSame (Node a _ _) (Node a _ _) = Just a
-- bad_nodesAreSame _ _ = Nothing

-- conditional evaluation with guards
-- If no guard succeeds, pattern matching moves on to the next pattern.
nodeAreSame (Node a _ _) (Node b _ _ )
    | a == b    = Just a
nodeAreSame _ _ = Nothing


lend3 account balance
    | account < 0             = Nothing
    | account < reserve * 0.5 = Nothing
    | otherwise               = Just newBalance
    where reserve    = 100
          newBalance = balance - account

-- We can use guards anywhere that we can use patterns.