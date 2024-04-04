#!/usr/bin/python3
""" LRU caching
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ LRU cache class
    """
    def __init__(self):
        """ Constructor method
        """
        super().__init__()
        self.cache_data = {}
        self.keys = []

    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if key in self.cache_data:
                    self.keys.remove(key)
                else:
                    first = self.keys.pop(0)
                    self.cache_data.pop(first)
                    print("DISCARD: {}".format(first))
            self.cache_data[key] = item
            self.keys.append(key)

    def get(self, key):
        """ Get an item by key
        """
        if key in self.cache_data:
            self.keys.remove(key)
            self.keys.append(key)
            return self.cache_data[key]
        return None
