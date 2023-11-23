# Write code ocr to convert image to text

from PIL import Image
import pytesseract
import cv2
import numpy as np
import os

# Thiết lập đường dẫn của Tesseract OCR engine (đặt đúng đường dẫn của bạn)
pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'



def segment_and_save_images(input_image_path, output_folder_path):
    # Đọc ảnh đầu vào
    img = cv2.imread(input_image_path)
    
    # Chuyển đổi ảnh sang ảnh xám
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Phát hiện cạnh trong ảnh
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)

    # Tìm các đường thẳng trong ảnh
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=100, maxLineGap=10)

    # Vẽ các đường thẳng lên ảnh để xem trước
    for line in lines:
        x1, y1, x2, y2 = line[0]
        cv2.line(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # Lưu ảnh đã nhận dạng các đường thẳng
    cv2.imwrite(output_folder_path + "/detected_lines.jpg", img)

    # Tách và lưu các segment
    count = 1
    for line in lines:
        x1, y1, x2, y2 = line[0]
        # print
        print(x1, y1, x2, y2)

        # get segment from image base on x1, y1, x2, y2
        segment = img[y1:y2, x1:x2]
        print(segment)

        # if segment:
        if segment.size != 0:
            cv2.imwrite(output_folder_path + "/segment_{count}.jpg", segment)
        count += 1

# Đường dẫn đến ảnh đầu vào
input_image_path = '../../sample/image/input.jpg'

# Đường dẫn đến thư mục để lưu các ảnh nhỏ
output_folder_path = './output'

# Gọi hàm để nhận dạng và tách ảnh thành các segment
segment_and_save_images(input_image_path, output_folder_path)
