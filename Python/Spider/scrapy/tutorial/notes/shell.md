## Invoking the shell from spiders to inspect responses
```
import scrapy

class MySpider(scrapy.Spider):
    name = "myspider"
    start_urls = [
        "http://example.com",
        "http://example.org",
        "http://example.net",
    ]

    def parse(self, response):
        # We want to inspect one specific response.
        if ".org" in response.url:
            from scrapy.shell import inspect_response
            inspect_response(response, self) ## the shell will show up from here

        # Rest of parsing code.
        
```
Finally you hit Ctrl-D (or Ctrl-Z in Windows) to exit the shell and resume the crawling