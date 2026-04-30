
# from fastapi import FastAPI, Depends, Query
# from sqlalchemy.orm import Session
# from typing import List
# from pydantic import BaseModel
# from datetime import datetime
# import boto3
# import uuid
# import os
# from dotenv import load_dotenv
# from fastapi.middleware.cors import CORSMiddleware

# from db.database import SessionLocal, engine, Base
# from module.image_model import ImageBatch, Image
# from botocore.config import Config

# # Load env
# load_dotenv()

# # Create tables
# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",   # your frontend
#         "http://127.0.0.1:3000"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # AWS Config
# AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
# AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
# REGION = os.getenv("AWS_REGION")
# BUCKET_NAME = os.getenv("AWS_S3_BUCKET")


# s3 = boto3.client(
#     "s3",
#     region_name=REGION,
#     aws_access_key_id=AWS_ACCESS_KEY,
#     aws_secret_access_key=AWS_SECRET_KEY,
#     config=Config(
#         signature_version="s3v4",
#         s3={"addressing_style": "virtual"}  
#     )
# )

# # -----------------------------
# # DB Dependency
# # -----------------------------
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # -----------------------------
# # Generate Single Signed URL
# # -----------------------------
# class FileRequest(BaseModel):
#     fileName: str
#     fileType: str


# @app.post("/generate-upload-url")
# def generate_upload_url(file: FileRequest):
#     ext = file.fileName.split(".")[-1]
#     key = f"uploads/{uuid.uuid4()}.{ext}"

#     upload_url = s3.generate_presigned_url(
#         "put_object",
#         Params={
#             "Bucket": BUCKET_NAME,
#             "Key": key,
#         },
#         ExpiresIn=300,
#     )

#     file_url = f"https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/{key}"

#     print("FILE URL  : ", file_url)

#     return {
#         "uploadUrl": upload_url,
#         "fileUrl": file_url,
#         "key": key
#     }


# # -----------------------------
# #  Save Images in DB
# # -----------------------------
# class SaveImagesRequest(BaseModel):
#     urls: List[str]


# @app.post("/save-images")
# def save_images(data: SaveImagesRequest, db: Session = Depends(get_db)):
#     try:
#         # Create batch
#         batch = ImageBatch(
#             thumbnail=data.urls[0],
#             count=len(data.urls),
#             created_at=datetime.utcnow()
#         )

#         db.add(batch)
#         db.commit()
#         db.refresh(batch)

#         # Create image records
#         images = [
#             Image(image_url=url, batch_id=batch.id)
#             for url in data.urls
#         ]

#         db.add_all(images)
#         db.commit()

#         return {
#             "message": "Saved successfully",
#             "batch_id": batch.id
#         }

#     except Exception as e:
#         db.rollback()
#         return {"error": str(e)}


# # -----------------------------
# # Get All Batches (Pagination)
# # -----------------------------
# @app.get("/batches")
# def get_batches(
#     page: int = Query(1, ge=1),
#     limit: int = Query(10, le=100),
#     db: Session = Depends(get_db)
# ):
#     offset = (page - 1) * limit

#     batches = db.query(ImageBatch)\
#         .order_by(ImageBatch.created_at.desc())\
#         .offset(offset)\
#         .limit(limit)\
#         .all()

#     total = db.query(ImageBatch).count()

#     result = [
#         {
#             "id": b.id,
#             "thumbnail": b.thumbnail,
#             "count": b.count,
#             "timestamp": b.created_at
#         }
#         for b in batches
#     ]

#     return {
#         "page": page,
#         "limit": limit,
#         "total": total,
#         "data": result
#     }


# # -----------------------------
# #  Get Single Batch + Images
# # -----------------------------
# @app.get("/batches/{batch_id}")
# def get_batch(batch_id: int, db: Session = Depends(get_db)):
#     batch = db.query(ImageBatch).filter(ImageBatch.id == batch_id).first()

#     if not batch:
#         return {"error": "Batch not found"}

#     return {
#         "id": batch.id,
#         "thumbnail": batch.thumbnail,
#         "count": batch.count,
#         "timestamp": batch.created_at,
#         "images": [img.image_url for img in batch.images]
#     }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.image_router import router as image_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(image_router)