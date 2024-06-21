using System;
using System.IO;
using System.Threading.Tasks;
using Volo.Abp.BlobStoring;
using Volo.Abp.Content;

namespace MokebManagerNg;

public class StorageAppService : MokebManagerNgAppService
{
    private readonly IBlobContainer _blobContainer;

    public StorageAppService(IBlobContainer blobContainer)
    {
        _blobContainer = blobContainer;
    }


    public async Task<string> UploadFileAsync(IRemoteStreamContent file)
    {
        if (file != null && file.ContentLength > 0)
        {
            Stream fs = file.GetStream();
            string fileExtension = Path.GetExtension(file.FileName);
            string imageName = Guid.NewGuid().ToString() + fileExtension;
            await _blobContainer.SaveAsync(imageName, fs);
            return imageName;
        }
        else
        {
            return null;
        }
    }
    public IRemoteStreamContent DownloadFile(string FileName)
    {
        //find your file with guid or implement your logic 
        var filePath = "Insert your file path here";
        var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        return new RemoteStreamContent(fs);
    }

}

