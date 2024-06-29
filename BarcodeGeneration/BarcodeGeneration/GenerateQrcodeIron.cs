using System.Drawing;
using System.Drawing.Imaging;
using IronBarCode;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace BarcodeGeneration;

public class GenerateQrcodeIron
{
    public void Run()
    {
        int qrPerRow = 4; // تعداد QR کدها در هر سطر
        int qrPerCol = 6; // تعداد QR کدها در هر ستون
        int totalQrCodes = qrPerRow * qrPerCol;
        int qrCodeSize = 100; // اندازه هر QR کد
        int margin = 20; // فاصله بین QR کدها

        // ایجاد سند PDF
        PdfDocument document = new PdfDocument();
        document.Info.Title = "QR Codes";

        // ایجاد صفحه خالی
        PdfPage page = document.AddPage();
        page.Size = PdfSharp.PageSize.A4;
        XGraphics gfx = XGraphics.FromPdfPage(page);

        // تولید QR کدها و قرار دادن آنها در PDF
        for (int i = 0; i < totalQrCodes; i++)
        {
            string guid = Guid.NewGuid().ToString();
            Bitmap qrCodeImage = GenerateQrCode(guid);

            int xPosition = (i % qrPerRow) * (qrCodeSize + margin) + 30;
            int yPosition = (i / qrPerRow) * (qrCodeSize + margin) + 30;

            using (MemoryStream stream = new MemoryStream())
            {
                qrCodeImage.Save(stream, ImageFormat.Png);
                stream.Position = 0;
                XImage xImage = XImage.FromStream(stream);
                gfx.DrawImage(xImage, xPosition, yPosition, qrCodeSize, qrCodeSize);
            }
        }

        // ذخیره سند با نام منحصر به فرد
        string filename = $"QRCodes_{DateTime.Now:yyyyMMddHHmmss}.pdf";
        document.Save(filename);
        Console.WriteLine($"PDF file '{filename}' generated successfully.");
    }


    static Bitmap GenerateQrCode(string text)
    {
        return QRCodeWriter.CreateQrCode(text, 400, QRCodeWriter.QrErrorCorrectionLevel.Highest).ToBitmap();
    }
}
