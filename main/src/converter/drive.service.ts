import { Injectable, Logger } from '@nestjs/common';
import { createReadStream } from 'fs';
import { google } from 'googleapis';
import { basename } from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: 'google-service-account.json',
  scopes: 'https://www.googleapis.com/auth/drive',
});
const drive = google.drive({ version: 'v3', auth });
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

@Injectable()
export class DriveService {
  private readonly logger = new Logger(DriveService.name);

  async uploadQuestion(imagePath, jsonPath) {
    // create new folder in google drive
    const newFolderId = await drive.files.create({
      requestBody: {
        name: new Date().toISOString(),
        parents: ['1Vb7ItYWYOyV_2ZEfyIb_sv5fQIK1wEZi'],
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id, webViewLink',
    });

    // upload image
    await drive.files.create({
      requestBody: {
        name: 'image.png',
        parents: [newFolderId.data.id],
        mimeType: 'image/png',
      },
      media: {
        mimeType: 'image/png',
        body: createReadStream(imagePath),
      },
      fields: 'id',
    });

    // upload json
    await drive.files.create({
      requestBody: {
        name: 'data.json',
        parents: [newFolderId.data.id],
        mimeType: 'application/json',
      },
      media: {
        mimeType: 'application/json',
        body: createReadStream(jsonPath),
      },
      fields: 'id',
    });

    return newFolderId.data.webViewLink;
  }

  async upload(filePath: string): Promise<string> {
    const fileName = basename(filePath);
    const { data } = await drive.files.create({
      requestBody: {
        name: fileName,
        // parents: [process.env.GOOGLE_QR_CODE_FOLDER_ID],
        parents: ['1Vb7ItYWYOyV_2ZEfyIb_sv5fQIK1wEZi'],
        mimeType: 'image/png',
      },
      media: {
        mimeType: 'image/png',
        body: createReadStream(filePath),
      },
      fields: 'id',
    });

    return data.id;
  }

  async sharePublicly(fileId: string): Promise<string> {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const { data } = await drive.files.get({
      fileId,
      fields: 'webContentLink',
    });

    return data.webContentLink;
  }
}
