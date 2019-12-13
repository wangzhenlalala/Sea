-- stack ghc -- ./SimpleJSON.hs -c 
module SimpleJSON 
(
    JValue(..),
    getBool,
    getInt,
    getDouble,
    getString,
    getArray,
    getObject,
    isNull
) where 
data JValue = JNumber Double
            | JString String
            | JBool Bool
            | JNull
            | JObject [(String, JValue)]
            | JArray [JValue]
            deriving(Show, Eq, Ord)


getString :: JValue -> Maybe String
getString (JString s) = Just s
getString _           = Nothing

getInt (JNumber d) = Just (truncate d)
getInt _           = Nothing

getDouble (JNumber d) = Just d
getDouble _           = Nothing

getBool (JBool b) = Just b 
getBool _         = Nothing

getObject (JObject o) = Just o
getObject _           = Nothing

getArray (JArray a) = Just a
getArray _          = Nothing


isNull v            = v == JNull