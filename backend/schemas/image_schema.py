from pydantic import BaseModel
from typing import List

class FileRequest(BaseModel):
    fileName: str
    fileType: str

class SaveImagesRequest(BaseModel):
    urls: List[str]