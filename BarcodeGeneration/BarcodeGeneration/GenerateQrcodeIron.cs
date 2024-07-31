using System.Drawing;
using System.Drawing.Imaging;
using IronBarCode;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using PdfSharp.Fonts;
using System.Text;
using System.IO;

namespace BarcodeGeneration
{
    public class GenerateQrcodeIron
    {
        public void Run()
        {
            int qrPerRow = 4; // تعداد QR کدها در هر سطر
            int qrPerCol = 6; // تعداد QR کدها در هر ستون
            int totalQrCodes = qrPerRow * qrPerCol;
            int qrCodeSize = 100; // اندازه هر QR کد
            int margin = 25; // فاصله بین QR کدها

            // مسیر فایل فونت Tahoma
            string fontPath = Path.Combine(Environment.CurrentDirectory, "W tahoma .ttf");

            // تنظیم حل‌کننده فونت سفارشی
            GlobalFontSettings.FontResolver = new CustomFontResolver(fontPath);

            // ایجاد سند PDF
            PdfDocument document = new PdfDocument();
            document.Info.Title = "QR Codes";

            // ایجاد صفحه خالی
            PdfPage page = document.AddPage();
            page.Size = PdfSharp.PageSize.A4;
            XGraphics gfx = XGraphics.FromPdfPage(page);

            // تنظیمات فونت برای متن زیر QR کدها
            XFont font = new XFont("Tahoma", 10, XFontStyleEx.Regular);

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

                    // محاسبه موقعیت y برای متن
                    int textYPosition = yPosition + qrCodeSize + 5; // 5 پیکسل پایین‌تر از QR کد

                    // متن فارسی
                    string text = "موکب منتظران ظهور حضرت مهدی(ع)";

                    // پردازش متن فارسی
                    string processedText = ProcessPersianText(text);

                    // اندازه‌گیری عرض متن برای راست‌چین کردن
                    XSize textSize = gfx.MeasureString(processedText, font);
                    int textXPosition = xPosition + qrCodeSize - (int)textSize.Width;

                    gfx.DrawString(processedText, font, XBrushes.Black, new XPoint(textXPosition, textYPosition));
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



        static string ProcessPersianText(string text)
        {
            // تبدیل متن به آرایه‌ای از کاراکترها
            var chars = text.ToCharArray();

            // معکوس کردن ترتیب کاراکترها
            Array.Reverse(chars);

            // تبدیل آرایه کاراکترها به رشته
            return new string(chars);
        }

        static string ReverseString(string s)
        {
            char[] arr = s.ToCharArray();
            Array.Reverse(arr);
            return new string(arr);
        }

        //static string ProcessPersianText(string text)
        //{
        //    // معکوس کردن کل متن
        //    string reversedText = ReverseString(text);
        //    // معکوس کردن حروف هر کلمه
        //    string[] words = reversedText.Split(' ');
        //    for (int i = 0; i < words.Length; i++)
        //    {
        //        words[i] = ReverseString(words[i]);
        //    }
        //    return string.Join(" ", words);
        //}

        //static string ReverseString(string s)
        //{
        //    char[] arr = s.ToCharArray();
        //    Array.Reverse(arr);
        //    return new string(arr);
        //}
    }
}


public class CustomFontResolver : IFontResolver
{
    private readonly string _fontPath;

    public CustomFontResolver(string fontPath)
    {
        _fontPath = fontPath;
    }

    public byte[] GetFont(string faceName)
    {
        if (faceName == "Tahoma#")
        {
            return File.ReadAllBytes(_fontPath);
        }
        return null;
    }

    public FontResolverInfo ResolveTypeface(string familyName, bool isBold, bool isItalic)
    {
        if (familyName == "Tahoma")
        {
            return new FontResolverInfo("Tahoma#");
        }
        return null;
    }
}