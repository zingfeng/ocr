# Service OCR for Vietnam

## Modules

### 1. Converter
- [ ] ppt, pptx to image converter
- [ ] pdf to image converter


### 2.Image Segmentation 

### 3. Optical Character Recognition,

### 4. Export
- [ ] Export to moodle xml


## Note
- Use env Linux (Ubuntu)

// python webserver
certbot

## Python

To update requirement
```
pip freeze > requirements.txt
```

// TO install tesseract
```
sudo apt install tesseract-ocr -y
```

## Upload file to google drive

To be able to upload QRCode files to Drive, follow the steps below:

1/ Go to (https://developers.google.com/identity/protocols/oauth2/service-account?hl=vi#creatinganaccount)
Then 
Create a service account. After creating, you will receive a JSON file 

Create file google-service-account.json and paste content of above JSON file into this file

Assign GOOGLE_APPLICATION_CREDENTIALS to google-service-account.json


Create a new folder in My Drive, get folder ID and assign it to GOOGLE_QR_CODE_FOLDER_ID

Share above folder with Editor permissions for client_email in google-service-account.json file


enable Google Drive API in google cloud