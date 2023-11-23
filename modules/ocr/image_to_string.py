# Write code ocr to convert image to text

from PIL import Image
import pytesseract
import cv2
import numpy as np
import os

# Thiết lập đường dẫn của Tesseract OCR engine (đặt đúng đường dẫn của bạn)
pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'

def extract_text_from_image(image_path):
    # Mở ảnh bằng thư viện Pillow (PIL)
    img = Image.open(image_path)

    # Sử dụng pytesseract để tách văn bản từ ảnh
    text = pytesseract.image_to_string(img)

    return text

# Đường dẫn đến ảnh bạn muốn xử lý
image_path = '../../sample/image/input.jpg'

# Gọi hàm để tách văn bản từ ảnh
extracted_text = extract_text_from_image(image_path)

# In ra kết quả pip install Pillow
print(extracted_text)

