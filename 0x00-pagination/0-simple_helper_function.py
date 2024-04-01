#!/usr/bin/env python3

"""helper function.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Retrieve  index range.
    """
    page_start = (page - 1) * page_size
    page_end = page_start + page_size
    return (page_start, page_end)
