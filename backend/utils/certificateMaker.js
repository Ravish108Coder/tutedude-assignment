
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'


export async function fillPDF(templatePath, outputPath, studentName, courseTaken, dateCompleted, certificateID) {
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Set up the default font and font size for text insertion
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const boldFont2 = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSizeStud = 45;
    const fontSizeMsg = 18;
    const fontSizeCertificateId = 10;
    const fontWeight = boldFont;
    const fontWeight2 = boldFont2;

    const message1 = `For successfully completing the Tutedude ${courseTaken}`
    const message2 = `course on ${dateCompleted}.`

    // Calculate the width of the text
    const textWidthStud = font.widthOfTextAtSize(studentName, fontSizeStud);
    const textWidthMsg1 = font.widthOfTextAtSize(message1, fontSizeMsg);
    const textWidthMsg2 = font.widthOfTextAtSize(message2, fontSizeMsg);

    // Calculate the x-coordinate for centering the text
    const centerXStud = (firstPage.getWidth() - textWidthStud) / 2;
    const centerXMsg1 = (firstPage.getWidth() - textWidthMsg1) / 2;
    const centerXMsg2 = (firstPage.getWidth() - textWidthMsg2) / 2;

    const centerY = (firstPage.getHeight()) / 2 + 75;

    firstPage.drawText(studentName, { x: centerXStud, y: centerY, size: fontSizeStud, font: fontWeight, color: rgb(229 / 255, 164 / 255, 26 / 255, 1) });
    firstPage.drawText(message1, { x: centerXMsg1, y: centerY - 40, size: fontSizeMsg, font: fontWeight2, color: rgb(0, 0, 0) });
    firstPage.drawText(message2, { x: centerXMsg2, y: centerY - 65, size: fontSizeMsg, font: fontWeight2, color: rgb(0, 0, 0) });
    firstPage.drawText(certificateID, { x: firstPage.getWidth() - 145, y: 65, size: fontSizeCertificateId, font: fontWeight, color: rgb(0, 0, 0) });

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, modifiedPdfBytes);
}


// Usage
// fillPDF('TDC.pdf', 'output.pdf', 'Aakash Kumar', 'Python', '03/05/2024', 'TD-AAKA-PY-5001');

