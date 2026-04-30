import uuid
from core.config import AWS_BUCKET, AWS_REGION
from utils.s3_client import s3
from db.repository import image_repo

def generate_upload_url(file):
    ext = file.fileName.split(".")[-1]
    key = f"uploads/{uuid.uuid4()}.{ext}"

    upload_url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": AWS_BUCKET,
            "Key": key,
        },
        ExpiresIn=300,
    )

    file_url = f"https://{AWS_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}"

    return {
        "uploadUrl": upload_url,
        "fileUrl": file_url,
        "key": key
    }

def save_images(db, urls):
    batch = image_repo.create_batch(db, urls)
    image_repo.create_images(db, batch.id, urls)

    return {
        "message": "Saved successfully",
        "batch_id": batch.id
    }

def fetch_batches(db, page, limit):
    offset = (page - 1) * limit

    batches = image_repo.get_batches(db, offset, limit)
    total = image_repo.get_total_batches(db)

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": [
            {
                "id": b.id,
                "thumbnail": b.thumbnail,
                "count": b.count,
                "timestamp": b.created_at
            }
            for b in batches
        ]
    }

def fetch_batch_by_id(db, batch_id):
    batch = image_repo.get_batch_by_id(db, batch_id)

    if not batch:
        return None

    return {
        "id": batch.id,
        "thumbnail": batch.thumbnail,
        "count": batch.count,
        "timestamp": batch.created_at,
        "images": [img.image_url for img in batch.images]
    }