# Signature Matching and Extraction

## Technologies Used:
1. React + Vite in Frontend
2. TailWind Css
3. Fastapi in backend
4. OpenCV and Scikit-Image

## Signature Extraction 
It is done using connected components analysis as seen in Ahmet Ozlu's Repo
## Signature Matching 
It is done by finding the SSIM(Structural Similarity Index Mean)

### To Run The Project
Start Server
```bash
cd server
mkdir inputs
mkdir outputs
python -m uvicorn main:app
```
Then Start React
```bash
cd frontend
npm run dev
```