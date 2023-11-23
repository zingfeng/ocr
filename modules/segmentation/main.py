import cv2
import numpy as np
from matplotlib import pyplot as plt

# read image
image_path = '../../sample/image/input.jpg'

img = cv2.imread(image_path) 
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU) 

# Noise removal using Morphological 
# closing operation 
kernel = np.ones((3, 3), np.uint8) 
closing = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, 
                            kernel, iterations = 2) 
  
# Background area using Dilation 
bg = cv2.dilate(closing, kernel, iterations = 1) 
  
# Finding foreground area 
dist_transform = cv2.distanceTransform(closing, cv2.DIST_L2, 0) 
ret, fg = cv2.threshold(dist_transform, 0.02 * dist_transform.max(), 255, 0)

# Hiển thị ảnh
cv2.imshow('image', thresh) 
# save image
cv2.imwrite('fg.png', fg)
cv2.imwrite('image.png', thresh)