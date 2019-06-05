# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import  tutorial.settings as settings
from tutorial.database import database_model

class QuotePipeline(object):
    def __init(self):
        # 如果是空的函数体，一定要加pass否则 identation error
        pass

    @classmethod
    def from_crawler(cls,crawler):
        # print(settings.ITEM_PIPELINES)
        
        return cls()
    
    def open_spider(self, spider):
        print('open spider')
        self.db = database_model()

    def process_item(self, item, spider):
        # print(item['author'], item['quote'],'hello')
        self.db.addItem(item)
        return item 

    def close_spider(self, spider):
        print('close spider')
        self.db.close()
