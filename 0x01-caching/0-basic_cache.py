#!/usr/bin/python3

from base_caching import BaseCaching
""" Basic cash"""

class BasicCache(BaseCaching):
    """ cashing class"""
    def put(self, key, item):
        """ Put method"""
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Get method"""
        if key in self.cache_data:
            return self.cache_data[key]
        return None
