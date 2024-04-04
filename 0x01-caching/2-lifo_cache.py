#!/usr/bin/python3
""" LIFO caching
"""
from base_caching import BaseCaching

class LIFOCache(BaseCaching):
    """ LIFO cache class for discaed the last element of item
    """
    def __init__(self):
        """ Constructor method
        """
        super().__init__()
        self.cache_data = {}
    
    def put(self, key, item):
        """ Add a item in the cache 
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                last = list(self.cache_data.keys())[-1]
                self.cache_data.pop(last)
                print("DISCARD: {}".format(last))
            self.cache_data[key] = item
        
    def get(self, key):
        """Retrieves an item by key.
        """
        return self.cache_data.get(key, None)
