# Write code ocr to convert image to text

from PIL import Image
import pytesseract
import cv2
import numpy as np
import os

# Thiết lập đường dẫn của Tesseract OCR engine (đặt đúng đường dẫn của bạn)
pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'

# Đường dẫn đến ảnh đầu vào
input_image_path = '../../sample/image/input.jpg'

# Đường dẫn đến thư mục để lưu các ảnh nhỏ
output_folder_path = './output'

# Gọi hàm để nhận dạng và tách ảnh thành các segment
# segment_and_save_images(input_image_path, output_folder_path)

def segment_and_save_images_by_contour(input_image_path, output_folder_path):
    # Đọc ảnh đầu vào
    img = cv2.imread(input_image_path)
    
    # Chuyển đổi ảnh sang ảnh xám
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Áp dụng GaussianBlur để làm mờ ảnh và giảm nhiễu
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Phát hiện các biên trong ảnh bằng phương pháp Canny
    edges = cv2.Canny(blurred, 50, 150)

    # Tìm contours trong ảnh
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Tạo thư mục đầu ra nếu nó chưa tồn tại
    os.makedirs(output_folder_path, exist_ok=True)

    # Lưu ảnh đã nhận dạng contours
    cv2.drawContours(img, contours, -1, (0, 255, 0), 2)
    cv2.imwrite(output_folder_path + "/detected_contours.jpg", img)

    # Tách và lưu các segment
    count = 1
    for contour in contours:
        # Tạo hình chữ nhật bao quanh contour
        x, y, w, h = cv2.boundingRect(contour)
        count += 1
        print(count, ": ", x, y, w, h)
        segment = img[y:y+h, x:x+w]
        
        text = pytesseract.image_to_string(segment)
        print(text)

        # Skip các segment có kích thước nhỏ
        if w < 50 or h < 50:
            continue

        # Lưu ảnh segment
        # convert count to string
        countStr = str(count)
        cv2.imwrite(output_folder_path + "/segment_" + countStr + ".jpg", segment)
        

segment_and_save_images_by_contour(input_image_path, output_folder_path)