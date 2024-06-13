using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class ZaerAppService : CrudAppService<Zaer, ZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateZaerDto, CreateUpdateZaerDto>,
    IZaerAppService
{
    public ZaerAppService(IRepository<Zaer, Guid> repository) : base(repository)
    {
    }
}
