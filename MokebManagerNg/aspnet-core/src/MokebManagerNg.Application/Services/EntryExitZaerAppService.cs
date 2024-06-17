using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class EntryExitZaerAppService : CrudAppService<EntryExitZaer, EntryExitZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateEntryExitZaerDto, CreateUpdateEntryExitZaerDto>,
    IEntryExitZaerDate
{

    private readonly IDistributedCache<PagedResultDto<EntryExitZaerDto>> _entryExitListCache;

    public EntryExitZaerAppService(IRepository<EntryExitZaer, Guid> repository,
    IDistributedCache<PagedResultDto<EntryExitZaerDto>> entryExitListCache) : base(repository)
    {
        _entryExitListCache = entryExitListCache;
    }

    

}
