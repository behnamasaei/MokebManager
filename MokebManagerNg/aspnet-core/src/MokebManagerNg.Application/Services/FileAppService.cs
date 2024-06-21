using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Services;
using Volo.Abp.BlobStoring;

namespace MokebManagerNg;

public class FileAppService : ApplicationService, IFileAppService
{
    private readonly IBlobContainer _fileContainer;

    public FileAppService(IBlobContainer fileContainer)
    {
        _fileContainer = fileContainer;
    }

    public async Task SaveBlobAsync(SaveBlobInputDto input)
    {
        await _fileContainer.SaveAsync(input.Name, input.Content, true);
    }

    public async Task<BlobDto> GetBlobAsync(GetBlobRequestDto input)
    {
        var blob = await _fileContainer.GetAllBytesAsync(input.Name);

        return new BlobDto
        {
            Name = input.Name,
            Content = blob
        };
    }

    public async Task<string> SaveBlobStreamAsync([FromForm] UploadFileDto input)
    {
        using (var memoryStream = new MemoryStream())
        {
            await input.File.CopyToAsync(memoryStream);
            string fileExtension = Path.GetExtension(input.Name);
            string imageName = Guid.NewGuid().ToString() + fileExtension;

            await _fileContainer.SaveAsync(imageName, memoryStream.ToArray());
            return imageName;
        }
    }
}