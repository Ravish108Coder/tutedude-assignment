import {google} from 'googleapis'
import path from 'path'
import fs from 'fs'

const __dirname = path.resolve();

const CLIENT_ID = '950819802897-an92tjha70emldnsthu55vln1sfjpd4q.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const REFRESH_TOKEN = '1//04_27syD1fyqPCgYIARAAGAQSNwF-L9IrWEQMJy59DryxuJmbjJcBEXlXFN3zGP1wZEJv4R81caI5veLZOcemtqPZuLCKaIB25PY'

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'output.pdf')

export async function uploadFile(pdfName) {
  try {
        const response = await drive.files.create({
            requestBody: {
                name: pdfName,
                mimeType: 'application/pdf'
            },
            media: {
                mimeType: 'application/pdf',
                body: fs.createReadStream(filePath)
            }
        })

        // console.log(response.data)
        const {id:fileID} = response.data
        const data = await generatePublicUrl(fileID)
        // fs.unlink(filePath)
        return data;
        
    } catch (error) {
        console.log(error.message)
    }
}

// uploadFile()

export async function deleteFile(fileID) {
    try {
      const response = await drive.files.delete({
        fileId: fileID
      });
      console.log(response.data, response.status);
    } catch (error) {
      console.log(error.message);
    }
  }

//   deleteFile()


async function generatePublicUrl(fileID) {
    try {
    //   const fileId = "1OsDi7Kvpwk5-edsT9BlrCSvAYjhtX5P6";
    //   11Azeh3p2n4a48GEW0PTbFrb
      await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileID,
        fields: 'webViewLink, webContentLink, thumbnailLink',
      });
      // console.log(result.data);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

//   generatePublicUrl()