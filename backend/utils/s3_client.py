import boto3
from botocore.config import Config
from core.config import AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION

s3 = boto3.client(
    "s3",
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    config=Config(signature_version="s3v4", s3={"addressing_style": "virtual"})
)