# Write code ocr to convert image to text

from PIL import Image
import pytesseract
import cv2
import numpy as np
import os

# Thiết lập đường dẫn của Tesseract OCR engine (đặt đúng đường dẫn của bạn)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

# Đường dẫn đến ảnh bạn muốn xử lý
image_path = '../../sample/image/input.jpg'

# Gọi hàm để tách văn bản từ ảnh
img = cv2.imread(image_path)
img2 = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

 # Cấu hình tùy chỉnh cho Tesseract OCR

# custom_config = r'--oem 3 --psm 6'

box = pytesseract.image_to_data(img2)


# In ra kết quả pip install Pillow
words = []
for x,b in enumerate(box.splitlines()):
    if x!=0:
        b = b.split()
        if len(b)==12:
            # print(b)
            words.append(b)
            x,y,w,h = int(b[6]),int(b[7]),int(b[8]),int(b[9])
            img_separate = img
            cv2.rectangle(img_separate, (x,y), (w+x,h+y), (0,0,255), 2)

            # print(b[11], x, y)
            cv2.putText(img_separate, b[11], (x,y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,255), 1)
cv2.imwrite('./result_1_separate_text.png', img_separate)

sentences = []
# by line
for word in words:
    print(word[11])
    if 




# Xác định các cụm từ trong ảnh
boxes = pytesseract.image_to_data(img2, output_type=pytesseract.Output.DICT)
print(boxes.keys())

