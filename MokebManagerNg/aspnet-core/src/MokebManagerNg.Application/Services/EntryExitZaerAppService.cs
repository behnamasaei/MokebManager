using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class EntryExitZaerAppService : CrudAppService<EntryExitZaer, EntryExitZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateEntryExitZaerDto, CreateUpdateEntryExitZaerDto>,
    IEntryExitZaerDate
{
    public EntryExitZaerAppService(IRepository<EntryExitZaer, Guid> repository) : base(repository)
    {
    }
}
