#!/usr/bin/python3
""" MRU caching
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRU cache class
    """
    def __init__(self):
        """ Constructor
        """
        super().__init__()
        self.cache_data = {}
    
    def put(self, key, item):
        """ Add item in the cache
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                mru = list(self.cache_data.keys())[-1]
                self.cache_data.pop(mru)
                print("DISCARD: {}".format(mru))
            self.cache_data[key] = item
        
    def get(self, key):
        """ Get an item by key
        """
        if key in self.cache_data:
            item = self.cache_data.pop(key)
            self.cache_data[key] = item
            return item
        return None
