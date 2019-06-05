doubleMe x = x + x

doubleUs x y = x*2 + y*2

doubleMeWhenBelow10 x = if x < 10
                        then x*2
                        else x
me = "wangzhen"

boomBangs xs = [ if x < 10 then "Little"  else "Big" | x <- xs, odd x]

com = [x*y | x <- [1..5], y <- [6..10], x < 3, y < 8]

length' xs = sum [ 1 | _ <- xs]

rightTriangle = [(a,b,c) | c <- [1..10], a <- [1..10], b <- [1..10], a^2 + b^2 == c^2]