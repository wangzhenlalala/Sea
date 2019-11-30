-- file ch01/WC.hs

main = interact wordCount
    where wordCount input = show ( length (words input) ) ++ "\n"

-- stack runghc ./WC.hs < ./quux.txt