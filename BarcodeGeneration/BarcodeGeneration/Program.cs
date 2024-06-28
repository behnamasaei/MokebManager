using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using BarcodeGeneration;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using QRCoder;

class Program
{
    static void Main()
    {
        GenerateBarcode barcode = new GenerateBarcode();
        barcode.Run();
        
    }

    
}
