# datetime
class:
* timedelta
    * timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)
    * timedelta().
        * days
        * seconds
        * total_seconds
* datetime
    * .min
    * .max
    * datetime(year,month, day, hour, minute, second, tzinfo=None)
        * 返回的是 tzinfo时区的当地时间，不指定tzinfo 本地的当地时间
    * datetime().
        * .astimezone(tzinfo=None)
            * 如果不指定tzinfo， 默认是当前的时区
            * 可以不指定tzinfo来把naive 转换成 aware 
        * .utcoffset() 如果是一个aware => timedelta()
        * .replace(hour,second, year,tzinfo)
            * 修改当前的对象，生成一个新的对象
        * tzname
        * time()
        * date()
        * timetz()
        * weekday() || isoweekday()
        * isoformat()
        * strftime(format-string)
* date
* time
* tzinfo
* timezone
    * .utc

## UNIX timestamp utc and local是一样的
## timestamp 只是表达时间的一种方式

1. 如何得到时间戳
* datetime_obj = datetime.datetime.now()
* datetime_obj.timestamp()

2. naive object and aware object 相差的是一个tzinfo对象。有没有保存时区的信息

3. 
    * datetime.datetime.now(tzinfo=None)
        * 不指定tzinfo 就得到一个 **本地的** naive datetime instance
        * 指定一个tzinfo,得到一个 **指定时区**的当前 aware datetime instance
    * datetime.datetime.utcnow()
4. 如何得到本地的tzinfo
    * datetime.datetime.now().astimezone().tzinfo
5. 处理日期的时候，最好的方式是保存成 UTC 的日期，当需要给人观看的时候，在转换成本地的时间
    * date_obj_a = datetime.datetime.now(tz=utc)
    * date_obj_b = datetime.datetime(2019, 12, 30, tz=utc);
    * date_obj_a.astimezone().strftime("%Y-%m-%d %H-%M-%S")
    
