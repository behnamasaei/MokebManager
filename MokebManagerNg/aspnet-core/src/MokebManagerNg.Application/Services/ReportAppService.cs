using System;
using System.Drawing;
using System.Drawing.Printing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MokebManagerNg.Domain.Dtos;
using Net.Codecrete.QrCodeGenerator;
using PdfSharpCore.Fonts;
using Stimulsoft.Report;
using Svg;
using Volo.Abp.Application.Services;
using Xceed.Document.NET;
using Xceed.Words.NET;

namespace MokebManagerNg;

public class ReportAppService : ApplicationService
{

    private ZaerDto _zaer;

    public async Task GenerateReportAsync()
    {
        var report = new StiReport();


        // StiLicense.LoadFromFile("./license.key");

        // Load the report template (ensure the path is correct)
        report.Load("./wwwroot/reports/Report3.mrt");

        // Fetch data for the report
        var data = await GetDataForReportAsync();
        report.RegData("DT", data);

        // Render the report
        report.Compile();
        report.Render();

        // Export to PDF
        using var stream = new MemoryStream();
        report.ExportDocument(StiExportFormat.Pdf, stream);

        string directoryPath = @"C:\Users\behna\MokebManager\MokebManagerNg\aspnet-core\src\MokebManagerNg.HttpApi.Host\Reports";
        string fileName = "report.pdf";
        string filePath = Path.Combine(directoryPath, fileName);

        var x = new FileDto
        {
            FileName = "MyReport.pdf",
            FileType = "application/pdf",
            FileContent = stream.ToArray()
        };

        // await using var fileStream = new FileStream("./", FileMode.Create);
        // Save the stream to a file
        SaveStreamToFile(stream, filePath);
    }

    public async Task GenerateCardZaerAsync(ZaerDto zaer)
    {
        const float WIDTH_PAGE = 2.83f; // Width in inches
        const float HEIGHT_PAGE = 3.94f; // Height in inches

        _zaer = zaer;

        PrintDocument pd = new PrintDocument();
        pd.PrintPage += new PrintPageEventHandler(PrintText);

        // // Set paper size to A7
        // PaperSize paperSize = new PaperSize("A7", (int)(WIDTH_PAGE * 100), (int)(HEIGHT_PAGE * 100));
        // pd.DefaultPageSettings.PaperSize = paperSize;

        // Set printer settings to ensure A7 paper is used
        PrinterSettings ps = new PrinterSettings();
        foreach (PaperSize size in ps.PaperSizes)
        {
            if (size.Kind == PaperKind.Custom && size.PaperName == "A7")
            {
                pd.DefaultPageSettings.PaperSize = size;
                break;
            }
        }

        pd.Print();
    }


    // https://github.com/manuelbl/QrCodeGenerator
    private void PrintText(object sender, PrintPageEventArgs e)
    {
        // Generate QR code as SVG string
        var qr = QrCode.EncodeText(_zaer.Mokeb.Location?.ToString(), QrCode.Ecc.Low);
        string svg = qr.ToSvgString(4);

        // Write SVG to a temporary file
        string svgFilePath = Path.Combine(Path.GetTempPath(), "qrcode.svg");
        File.WriteAllText(svgFilePath, svg);

        // Load and draw the SVG file
        SvgDocument svgDocument = SvgDocument.Open(svgFilePath);

        // Increase the size of the Bitmap
        int bitmapWidth = 150; // Adjust this value to increase the size of the QR code
        int bitmapHeight = 150; // Adjust this value to increase the size of the QR code
        Bitmap svgBitmap = new(svgDocument.Draw(bitmapWidth, bitmapHeight));

        // Draw the enlarged Bitmap on the page
        e.Graphics.DrawImage(svgBitmap, new RectangleF(50, 0, bitmapWidth, bitmapHeight));

        // Offset for the text below the SVG (reduce the space)
        float yOffset = svgBitmap.Height + 5; // Reduced space after the SVG

        // Define font and brush
        System.Drawing.Font font = new System.Drawing.Font("Arial", 12); // Font size can be adjusted
        Brush brush = Brushes.Black;

        // Get the right margin for alignment
        float rightMargin = e.MarginBounds.Right;
        float leftMargin = e.MarginBounds.Left;


        // Calculate line height for consistent vertical spacing
        float lineHeight = font.GetHeight(e.Graphics);
        float yPos = yOffset; // Start immediately after the QR code

        // Create string format for right alignment
        StringFormat format = new StringFormat
        {
            Alignment = StringAlignment.Far, // Align text to the right
        };

        StringFormat formatHeader = new StringFormat
        {
            Alignment = StringAlignment.Center, // Align text to the right
        };

        // Array of strings to print
        var zaerCard = new string[]
        {
        $"نام و نام خانوادگی: {_zaer.Name} {_zaer.Family}",
        $"{_zaer.PassportNo} :شماره پاسپورت",
        $"موکب: {_zaer.Mokeb.Name}",
        $"{_zaer.MokebState.State} :جایگاه",
        $"{ConvertUtcToJalali(_zaer.EntryExitZaerDates.First().ExitDate)} :خروج",
        };

        // Iterate over each string and draw it on the page
        foreach (string line in zaerCard)
        {
            // Draw string right-aligned at the specified position
            // e.Graphics.DrawString(line, font, brush, new PointF(rightMargin, yPos), format);
            // e.Graphics.DrawString(line, font, brush, new RectangleF(leftMargin, yPos, e.MarginBounds.Width, lineHeight), format);
            // e.Graphics.DrawString(line, font, brush, new RectangleF(leftMargin, yPos, rightMargin - leftMargin, lineHeight), format);
            e.Graphics.DrawString(line, font, brush, new RectangleF(0, yPos, e.PageSettings.PaperSize.Width - 35, e.MarginBounds.Height), format);



            yPos += lineHeight; // Move to next line position
        }

        yPos += lineHeight;
        yPos += lineHeight;


        string[] connectionText = new string[] {
            "سامانه مدیریت موکب شهدای فاوا",
            "abarmatn.com",
            "behnamasaei@gmail.com"
        };
        foreach (var line in connectionText)
        {
            e.Graphics.DrawString(line, new System.Drawing.Font("Arial", 8), brush, new RectangleF(0, yPos, e.PageSettings.PaperSize.Width - 30, e.MarginBounds.Height), format);
            yPos += lineHeight;
        }


        // Clean up the temporary SVG file
        File.Delete(svgFilePath);
    }



    public static string ConvertUtcToJalali(DateTime utcDateTime)
    {
        PersianCalendar persianCalendar = new PersianCalendar();

        int year = persianCalendar.GetYear(utcDateTime);
        int month = persianCalendar.GetMonth(utcDateTime);
        int day = persianCalendar.GetDayOfMonth(utcDateTime);
        int hour = persianCalendar.GetHour(utcDateTime);
        int minute = persianCalendar.GetMinute(utcDateTime);
        int second = persianCalendar.GetSecond(utcDateTime);

        return $"{year}/{month:D2}/{day:D2} {hour:D2}:{minute:D2}";
    }

    static void SaveStreamToFile(Stream stream, string filePath)
    {
        // Ensure the stream is at the beginning
        stream.Seek(0, SeekOrigin.Begin);

        // Create a FileStream to write the stream to the specified file
        using (FileStream fileStream = File.Create(filePath))
        {
            // Copy the stream to the FileStream
            stream.CopyTo(fileStream);
        }
    }

    private async Task<ReportDataDto> GetDataForReportAsync()
    {
        // Fetch data from database or other sources
        return new ReportDataDto
        {
            Name = "بهنام",
            Family = "آسایی",
            Mokeb = "امام رضا (ع)",
            PassportID = "sdfwe234",
            Prdate = DateTime.Now.ToString("HH/MM/DD")
        };
    }
}

