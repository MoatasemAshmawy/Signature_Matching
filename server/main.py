import os
import uuid
import cv2
from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import numpy as np
from signature_extractor import extract_signature
from signature_matcher import image_match

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
async def match(image1: UploadFile, image2: UploadFile):
    if not image1 or not image2:
        return {"error": "Please make sure to provide both images"}
    
    if (image1.content_type != "image/png" and image1.content_type != "image/jpeg") or (image2.content_type != "image/png" and image2.content_type != "image/jpeg"):
        raise HTTPException(status_code=415,detail="Only Png and Jpeg are supported.")
    
    input1_file_path = "./inputs/input_" + str(uuid.uuid4()) +".png"
    input2_file_path = "./inputs/input_" + str(uuid.uuid4()) +".png"

    with open(input1_file_path, "+wb") as file:
        content = await image1.read()
        file.write(content)
    with open(input2_file_path, "+wb") as file:
        content = await image2.read()
        file.write(content)
    
    similarity_value = image_match(input1_file_path, input2_file_path)
    os.remove(input1_file_path)
    os.remove(input2_file_path)

    return {"data": similarity_value}

@app.post("/api/extract")
async def extract(image: UploadFile):
    if not image:
        return {"error": "No upload file sent"}
    
    if image.content_type != "image/png" and image.content_type != "image/jpeg":
        raise HTTPException(status_code=415,detail="Only Png and Jpeg are supported.")
    
    input_file_path = "./inputs/input_" + str(uuid.uuid4()) +".png"
    with open(input_file_path, "+wb") as file:
        content = await image.read()
        file.write(content)
    output_file_name = extract_signature(input_file_path)
    os.remove(input_file_path)
    return {"image_path": f"images/{output_file_name}"}
    