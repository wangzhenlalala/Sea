module PutJSON where
import SimpleJSON
import Data.List (intercalate)

renderJVale :: JValue -> String

render JNull                = "null"
renderJValue (JBool True)   = "true"
renderJValue (JBool False)  = "false"
renderJValue (JNumber n)    = show n
renderJValue (JString s)    = show s

renderJValue (JObject o)    = "{ " ++ pairs o ++ " }"
    where pairs []  = ""
          pairs xs  = intercalate ", " (map renderPair xs) 
          renderPair (key, value) = show key ++ ": " ++ renderJValue value

renderrJValue (JArray a)    = "[ " ++  renderArray a ++ " ]"
    where renderArray [] = ""
          renderArray xs = intercalate ", " (map renderJValue xs)
