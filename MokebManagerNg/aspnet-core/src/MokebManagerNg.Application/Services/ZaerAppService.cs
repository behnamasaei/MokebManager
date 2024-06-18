using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.BlobStoring;
using System.Net.Http;
using Volo.Abp.Content;

namespace MokebManagerNg;

public class ZaerAppService : CrudAppService<Zaer, ZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateZaerDto, CreateUpdateZaerDto>,
    IZaerAppService
{
    IRepository<Zaer, Guid> _repository;
    private readonly IBlobContainer _blobContainer;
    private readonly StorageAppService _storageAppService;
    private readonly IFileAppService _fileAppService;
    public ZaerAppService(IRepository<Zaer, Guid> repository, IBlobContainer blobContainer, StorageAppService storageAppService, IFileAppService fileAppService) : base(repository)
    {
        _repository = repository;
        _blobContainer = blobContainer;
        _storageAppService = storageAppService;
        _fileAppService = fileAppService;
    }

    public override Task<ZaerDto> CreateAsync(CreateUpdateZaerDto input)
    {
        return base.CreateAsync(input);
    }

    public async Task<ZaerDto> GetWithDetailAsync(Guid id)
    {
        // var student = await _repository.GetAsync(id, includeDetails: false);
        // //student.Groups is empty on this stage
        // await _repository.EnsureCollectionLoadedAsync(student, x => x.EntryExitZaerDates);
        // //student.Groups is filled now

        var queryable = await _repository.WithDetailsAsync(e => e.EntryExitZaerDates);
        var query = queryable.Where(x => x.Id == id);
        var dataWithDetail = await AsyncExecuter.FirstOrDefaultAsync(query);

        return ObjectMapper.Map<Zaer, ZaerDto>(dataWithDetail);
    }

    public async Task<ZaerDto> CreateNewAsync(CreateUpdateZaerDto input)
    {
        // if (image != null && image.ContentLength > 0)
        // {
        //     Stream fs = image.GetStream();
        //     string fileExtension = Path.GetExtension(image.FileName);
        //     string imageName = Guid.NewGuid().ToString() + fileExtension;
        //     await _blobContainer.SaveAsync(imageName, fs);
        //     input.ImageFileName = imageName;
        // }

        // using (var memoryStream = new MemoryStream())
        // {
        //     await image.File.CopyToAsync(memoryStream);
        //     string fileExtension = Path.GetExtension(image.Name);
        //     string imageName = Guid.NewGuid().ToString() + fileExtension;
        //     input.ImageFileName = imageName;

        //     await _fileAppService.SaveBlobAsync(
        //         new SaveBlobInputDto
        //         {
        //             Name = imageName,
        //             Content = memoryStream.ToArray()
        //         }
        //     );
        // }
        return await base.CreateAsync(input);
    }
}
