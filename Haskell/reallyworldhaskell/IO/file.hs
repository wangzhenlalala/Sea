import System.IO
import Data.Char (toUpper) 

main :: IO ()
main = do
    inh <- openFile "./input.txt" ReadMode
    outh <- openFile "./output.txt" WriteMode

    mainLoop inh outh

    hClose inh
    hClose outh

mainLoop :: Handle -> Handle -> IO ()
mainLoop inh outh = 
    do  
        feof <- hIsEOF inh
        if feof then 
            return ()
        else do 
                -- do 里面的表达式，必须具有相同的identation,相同的空格数
                line <- hGetLine inh
                hPutStrLn outh (map toUpper line)
                mainLoop inh outh
        