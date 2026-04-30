from sqlalchemy.orm import Session
from module.image_model import ImageBatch, Image
from datetime import datetime

def create_batch(db: Session, urls):
    batch = ImageBatch(
        thumbnail=urls[0],
        count=len(urls),
        created_at=datetime.utcnow()
    )
    db.add(batch)
    db.commit()
    db.refresh(batch)
    return batch

def create_images(db: Session, batch_id, urls):
    images = [
        Image(image_url=url, batch_id=batch_id)
        for url in urls
    ]
    db.add_all(images)
    db.commit()

def get_batches(db: Session, offset: int, limit: int):
    return db.query(ImageBatch)\
        .order_by(ImageBatch.created_at.desc())\
        .offset(offset)\
        .limit(limit)\
        .all()

def get_total_batches(db: Session):
    return db.query(ImageBatch).count()

def get_batch_by_id(db: Session, batch_id: int):
    return db.query(ImageBatch)\
        .filter(ImageBatch.id == batch_id)\
        .first()