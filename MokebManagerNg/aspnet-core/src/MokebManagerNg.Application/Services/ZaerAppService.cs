using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MokebManagerNg;

public class ZaerAppService : CrudAppService<Zaer, ZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateZaerDto, CreateUpdateZaerDto>,
    IZaerAppService
{
    IRepository<Zaer, Guid> _repository;
    public ZaerAppService(IRepository<Zaer, Guid> repository) : base(repository)
    {
        _repository = repository;
    }

    public override Task<ZaerDto> CreateAsync(CreateUpdateZaerDto input)
    {
        return base.CreateAsync(input);
    }

    public async Task<ZaerDto> GetWithDetailAsync(Guid id)
    {
        var zaer = await _repository.GetAsync(id, includeDetails: true);
        return ObjectMapper.Map<Zaer, ZaerDto>(zaer);
    }

    public Task<ZaerDto> CreateNewAsync([FromForm] CreateUpdateZaerDto input)
    {
        if (input.Image != null || input.Image.Length != 0)
        {
            string fileExtension = Path.GetExtension(input.Image.FileName);
            string imageName = Guid.NewGuid().ToString() + fileExtension;
            input.ImageAddress = imageName;

            var uploadPath = Path.Combine("wwwroot", "uploads");
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var savePath = Path.Combine(uploadPath, imageName);

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                input.Image.CopyTo(stream);
            }
        }

        return CreateAsync(input);
    }
}
