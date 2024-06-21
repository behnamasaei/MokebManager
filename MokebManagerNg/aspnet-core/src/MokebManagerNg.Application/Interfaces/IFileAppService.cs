using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Services;

namespace MokebManagerNg;

public interface IFileAppService : IApplicationService
{
    Task SaveBlobAsync(SaveBlobInputDto input);

    Task<string> SaveBlobStreamAsync([FromForm] UploadFileDto input);

    Task<BlobDto> GetBlobAsync(GetBlobRequestDto input);
}
