from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from db.database import SessionLocal
from schemas.image_schema import FileRequest, SaveImagesRequest
from services import image_service

router = APIRouter(prefix="/images", tags=["Images"])

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/generate-upload-url")
def generate_upload_url(file: FileRequest):
    return image_service.generate_upload_url(file)


@router.post("/save-images")
def save_images(data: SaveImagesRequest, db: Session = Depends(get_db)):
    return image_service.save_images(db, data.urls)


@router.get("/batches")
def get_batches(
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=100),
    db: Session = Depends(get_db)
):
    return image_service.fetch_batches(db, page, limit)


@router.get("/batches/{batch_id}")
def get_batch(batch_id: int, db: Session = Depends(get_db)):
    result = image_service.fetch_batch_by_id(db, batch_id)

    if not result:
        return {"error": "Batch not found"}

    return result