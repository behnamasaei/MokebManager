using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Stimulsoft.Base;
using Stimulsoft.Report;
using Volo.Abp.Application.Services;

namespace MokebManagerNg;

public class ReportAppService : ApplicationService
{
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
