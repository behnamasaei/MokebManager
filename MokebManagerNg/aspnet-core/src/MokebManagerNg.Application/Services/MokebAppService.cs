using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class MokebAppService : CrudAppService<Mokeb, MokebDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateMokebDto, CreateUpdateMokebDto>,
    IMokebAppService
{
    public MokebAppService(IRepository<Mokeb, Guid> repository) : base(repository)
    {
    }
}
