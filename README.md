# OCR
 
Service này cung cấp 1 API nhận vào 1 ảnh, nhận diện ký tự trên ảnh sau đó thay bằng các khối block A, B, C, D

Sau đó generate câu hỏi trắc nghiệm dựa trên các ký tự đó.

Ví dụ về output có thể xem tại đây: https://drive.google.com/drive/folders/1Vb7ItYWYOyV_2ZEfyIb_sv5fQIK1wEZi?usp=sharing

Để call API: 
```
curl --location 'http://localhost:8000/converter/upload' --form 'file=@"/path/to/image.jpg"'
```

## Cấu trúc

Gồm 2 service:
- ./main: Được viết bằng Typescript (NestJS) - hiện chạy tại port 8000
- ./ocr: Viết bằng python - chạy tại port 4000

Cần khởi chạy cả 2 service này:
- Với NestJS: 
```
cd ./main 
yarn install
yarn start:dev
```
- Với python
```
cd ./ocr 
python main.py
```


## Cấu hình upload file lên google drive
(Cấu hình tại service NestJS)

1/ Tạo google cloud project

2/ Enable Google Drive API của project vừa tạo

3/ Tạo service account credential 

(https://developers.google.com/identity/protocols/oauth2/service-account?hl=vi#creatinganaccount)

Tạo key tương ứng, sau đó tải về file JSON, lưu thành file google-service-account.json trong thư mục ./main (cùng thư mục với file  google-service-account.json.example)

4/ Tạo thư mục drive muốn lưu
- Share quyền Editor cho client_email (ví dụ: ocr-agent@hust-ocr.iam.gserviceaccount.com). client_email nằm trong file google-service-account.json

- Lấy folder id trên URL drive của folder:

Ví dụ: 

URL https://drive.google.com/drive/u/0/folders/1S4ml6iq-4eZV4AhMH5aYB9C42ervJiJMa

Thì Folder Id tương ứng là: 1S4ml6iq-4eZV4AhMH5aYB9C42ervJiJMa


- Thay folder Id này vào file main\src\converter\drive.service.ts

