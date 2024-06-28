using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
// using MokebManagerNg.Domain.CreateUpdateDtos;

namespace MokebManagerNg;

public interface IEntryExitZaerDateAppService :
    ICrudAppService<
        EntryExitZaerDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateEntryExitZaerDto,
        CreateUpdateEntryExitZaerDto>
{

}
