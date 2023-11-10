import cv2
import numpy as np
from matplotlib import pyplot as plt

# Đọc ảnh từ file
image_path = '../../sample/image/coin-detection.jpg'

img = cv2.imread(image_path) 
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
ret, thresh = cv2.threshold(gray, 0, 255,                             cv2.THRESH_BINARY_INV +
                            cv2.THRESH_OTSU) 
cv2.imshow('image', thresh) 