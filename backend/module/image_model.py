from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.database import Base


class ImageBatch(Base):
    __tablename__ = "image_batches"

    id = Column(Integer, primary_key=True, index=True)
    thumbnail = Column(String, nullable=False)
    count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # relationship
    images = relationship("Image", back_populates="batch", cascade="all, delete")


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)

    batch_id = Column(Integer, ForeignKey("image_batches.id"))

    # relationship
    batch = relationship("ImageBatch", back_populates="images")