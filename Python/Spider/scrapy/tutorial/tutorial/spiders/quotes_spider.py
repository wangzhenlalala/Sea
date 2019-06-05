'''
    spiders  must subclass scrapy.Spider 
    and define the initial requests to make, 
    optionally how to follow links in the pages, 
    and how to parse the downloaded page content to extract data.

    how to start a spider: 
        go to the project's top level directory and run 
        scrapy crawl spider-name
    how to interactively parse html:
        scrapy shell url and play with response
    how to store data:
        scrapy crawl spider-name -o quotes.json (easiest way) called [Feed exports]
    how to pass arguments to spider:
        scrapy crawl quotes -o quotes-humor.json -a tag=humor
        ## arguments are passed to the Spider’s __init__ method and become spider attributes by default.
'''
import scrapy
from tutorial.items import QuoteItem

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    def start_requests(self):
        '''
        must return an iterable of Requests 
        (you can return a list of requests or write a generator function) 
        which the Spider will begin to crawl from.
        '''
        url = "http://quotes.toscrape.com/" ## you can visit this site to get all tags
                                            ## [ love, life , humor, books, reading, ...]
        # tag = getattr(self, 'tag', 'love')
        # url = url + 'tag/' + tag
        yield scrapy.Request(url, self.parse)
        # urls = [
        #     "http://quotes.toscrape.com/page/1/"
        # ]
        # for url in urls:
        #     yield scrapy.Request(url=url, callback=self.parse)
        #
        # start_urls = [] 
    def parse(self, response):
        '''
        The parse() method will be called to handle each of the requests
        This happens because parse() is Scrapy’s default callback method, 
        which is called for requests without an explicitly assigned callback.
        '''
        # page = response.url.split("/")[-2]
        # filename = 'quotes-%s.html' % page
        # with open(filename, 'wb') as f:
        #     f.write(response.body)
        # self.log('Saved file %s' % filename)
        for quote_itr in response.css('div.quote'):
            item = QuoteItem()
            
            quote = quote_itr.css('span.text::text').extract_first()
            author = quote_itr.css('small.author::text').extract_first()
            tags = quote_itr.css('div.tags a.tag::text').extract()

            item['quote'] = quote
            item['author'] = author
            yield item
        
        '''
        What you see here is Scrapy’s mechanism of [[following links]]: 
        when you yield a Request in a callback method, 
        Scrapy will schedule that request to be sent and register a callback method 
        to be executed when that request finishes.
        '''
        next_page = response.css('li.next a::attr(href)').extract_first()
        if next_page is not None:
            # next_page = response.urljoin(next_page) ## builds a full absolute URL
            # yield scrapy.Request(next_page, callback=self.parse)
            ##### below is a shortcut to yield a request
            ##### response.follow supports relative URLs directly-no need to call urljoin
            yield response.follow(next_page, callback=self.parse) 
