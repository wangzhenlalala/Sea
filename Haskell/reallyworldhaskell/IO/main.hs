main2 = do
    putStrLn "Hello What is your name?"
    inputName <- getLine
    putStrLn $ "Welcome to Haskell " ++ show inputName ++ " !"

main = 
    putStrLn "Hello What is your name?" >>
    getLine >>= 
    (\input -> putStrLn $ "Welcome to Haskell " ++ input ++ " !")
