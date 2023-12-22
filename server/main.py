import os
import uuid
import cv2
from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import numpy as np
from signature_extractor import extract_signature

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="./outputs"), name="outputs")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/match")
def match(image1: UploadFile, image2: UploadFile):
    return {"example_data": [1, 2, 3, 4, 5]}

@app.post("/api/extract")
async def extract(image: UploadFile):
    if not image:
        return {"message": "No upload file sent"}
    else:
        if image.content_type != "image/png" and image.content_type != "image/jpeg":
            raise HTTPException(status_code=415,detail="Only Png and Jpeg are supported.")
    input_file_path = "./inputs/input_" + str(uuid.uuid4()) +".png"
    with open(input_file_path, "+wb") as file:
        content = await image.read()
        file.write(content)
    output_file_name = extract_signature(input_file_path)
    os.remove(input_file_path)
    return {"image_path": f"images/{output_file_name}"}
    