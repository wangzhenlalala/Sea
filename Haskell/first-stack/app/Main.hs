module Main where

import Lib
import SimpleJSON

main :: IO ()
main = print (JObject [("name", JString "wangzhen"), ("age", JNumber 26)])
