using System.Drawing;
using System.Drawing.Imaging;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using QRCoder;

namespace BarcodeGeneration;

public class GenerateQrCodes
{
    public void Run()
    {
        int qrPerRow = 4; // تعداد QR کدها در هر سطر
        int qrPerCol = 6; // تعداد QR کدها در هر ستون
        int totalQrCodes = qrPerRow * qrPerCol;
        int qrCodeSize = 130; // اندازه هر QR کد
        int margin = 10; // فاصله بین QR کدها

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
            Bitmap qrCodeImage = GenerateQrCode(guid, qrCodeSize);

            int xPosition = (i % qrPerRow) * (qrCodeSize + margin);
            int yPosition = (i / qrPerRow) * (qrCodeSize + margin);

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


    static Bitmap GenerateQrCode(string text, int size)
    {
        using (QRCodeGenerator qrGenerator = new QRCodeGenerator())
        using (QRCodeData qrCodeData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.Q))
        using (BitmapByteQRCode qrCode = new BitmapByteQRCode(qrCodeData))
        {
            byte[] qrCodeAsBitmapByteArr = qrCode.GetGraphic(20, "#000000", "#FFFFFF");

            using (var ms = new MemoryStream(qrCodeAsBitmapByteArr))
            {
                var qrCodeImage = new Bitmap(ms);

                // افزایش وضوح تصویر برای از بین بردن سایه
                var resizedImage = new Bitmap(size, size);
                using (var graphics = Graphics.FromImage(resizedImage))
                {
                    graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    graphics.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;
                    graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    graphics.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    graphics.DrawImage(qrCodeImage, 0, 0, size, size);
                }
                return resizedImage;
            }
        }
    }
}
