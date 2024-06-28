using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using NetBarcode;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace BarcodeGeneration
{
    public class GenerateBarcode
    {
        private const int BarcodesPerRow = 4; // تعداد بارکدها در هر سطر
        private const int BarcodesPerCol = 6; // تعداد بارکدها در هر ستون
        private const int BarcodeWidth = 150; // عرض هر بارکد
        private const int BarcodeHeight = 70; // ارتفاع هر بارکد
        private const int Margin = 20; // فاصله بین بارکدها

        public void Run()
        {
            int totalBarcodes = BarcodesPerRow * BarcodesPerCol;

            // ایجاد سند PDF
            PdfDocument document = CreatePdfDocument();

            // ایجاد صفحه خالی
            PdfPage page = document.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);

            // تولید بارکدها و قرار دادن آنها در PDF
            for (int i = 0; i < totalBarcodes; i++)
            {
                string guid = Guid.NewGuid().ToString();
                Bitmap barcodeImage = GenerateBarcodes(guid);

                int xPosition = GetXPosition(i);
                int yPosition = GetYPosition(i);

                DrawBarcodeOnPdf(gfx, barcodeImage, xPosition, yPosition);
            }

            SavePdfDocument(document);
        }

        private static PdfDocument CreatePdfDocument()
        {
            PdfDocument document = new PdfDocument();
            document.Info.Title = "Barcodes";
            return document;
        }

        private static Bitmap GenerateBarcodes(string text)
        {
            var barcode = new Barcode();
            var barcodeByte = barcode.GetByteArray(text);

            using var ms = new MemoryStream(barcodeByte);
            var barcodeImage = new Bitmap(ms);
            return new Bitmap(barcodeImage, new Size(BarcodeWidth, BarcodeHeight)); // تغییر اندازه بارکد به اندازه مشخص شده
        }

        private static int GetXPosition(int index)
        {
            return (index % BarcodesPerRow) * (BarcodeWidth + Margin);
        }

        private static int GetYPosition(int index)
        {
            return (index / BarcodesPerRow) * (BarcodeHeight + Margin);
        }

        private static void DrawBarcodeOnPdf(XGraphics gfx, Bitmap barcodeImage, int xPosition, int yPosition)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                barcodeImage.Save(stream, ImageFormat.Png);
                stream.Position = 0;
                XImage xImage = XImage.FromStream(stream);
                gfx.DrawImage(xImage, xPosition, yPosition, BarcodeWidth, BarcodeHeight);
            }
        }

        private static void SavePdfDocument(PdfDocument document)
        {
            string filename = $"Barcodes_{DateTime.Now:yyyyMMddHHmmss}.pdf";
            document.Save(filename);
            Console.WriteLine($"PDF file '{filename}' generated successfully.");
        }
    }
}
