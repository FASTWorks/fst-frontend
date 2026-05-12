from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    name: str
    price: float
    category: str

class OCRResponse(BaseModel):
    store_name: Optional[str]
    date: Optional[str]
    total_amount: float
    items: List[Item]
    category_summary: Optional[str]
    confidence_score: float