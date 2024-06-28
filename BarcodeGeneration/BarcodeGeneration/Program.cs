using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using BarcodeGeneration;
using IronBarCode;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using QRCoder;

class Program
{
    static void Main()
    {
        // GenerateBarcode barcode = new GenerateBarcode();
        // barcode.Run();


        IronBarCode.License.LicenseKey = "IRONBARCODE-BOARD4ALL.BIZ-122711-F2BCE7-4CCB5FE5DD-5965DEE1-NEx-EP7";


        // bool result = IronBarCode.License.IsValidLicense("IRONBARCODE-BOARD4ALL.BIZ-122711-F2BCE7-4CCB5FE5DD-5965DEE1-NEx-EP7");

        // System.Console.WriteLine(result);

        GenerateQrcodeIron generateQrcodeIron = new();
        generateQrcodeIron.Run();
    }


}
