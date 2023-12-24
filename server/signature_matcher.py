import cv2
from skimage.metrics import structural_similarity as ssim

def image_match(path1, path2):
    # read the images
    img1 = cv2.imread(path1)
    img2 = cv2.imread(path2)
    # turn images to grayscale
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    # resize images for comparison
    img1 = cv2.resize(img1, (300, 300))
    img2 = cv2.resize(img2, (300, 300))
    
    similarity_value = "{:.2f}".format(ssim(img1, img2)*100)

    return float(similarity_value)

if __name__ == "__main__":
   image_match("./inputs/in1.jpg", "./inputs/in1.jpg")