using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using MokebManagerNg.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace MokebManagerNg;

[Authorize(MokebManagerNgPermissions.Reservation)]
public class EntryExitZaerAppService : CrudAppService<EntryExitZaer, EntryExitZaerDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateEntryExitZaerDto, CreateUpdateEntryExitZaerDto>,
    IEntryExitZaerDateAppService
{

    private readonly IDistributedCache<List<EntryExitZaerDto>> _entryExitListCache;
    private readonly IRepository<EntryExitZaer, Guid> _repository;

    public EntryExitZaerAppService(IRepository<EntryExitZaer, Guid> repository,
    IDistributedCache<List<EntryExitZaerDto>> entryExitListCache) : base(repository)
    {
        _entryExitListCache = entryExitListCache;
        _repository = repository;
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public async Task<IList<EntryExitZaerDto>> GetAllEntryExitAsync()
    {
        string cacheKey = "AllEntryExit_cache";

        // Try to get data from the cache
        var cachedData = await _entryExitListCache.GetAsync(cacheKey);

        if (cachedData != null)
        {
            return cachedData;
        }

        var listEntryExit = await _repository.GetListAsync();
        var entryExitListDto = ObjectMapper.Map<List<EntryExitZaer>, List<EntryExitZaerDto>>(listEntryExit);
        await _entryExitListCache.SetAsync(cacheKey, entryExitListDto);
        return entryExitListDto;
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public override async Task<EntryExitZaerDto> GetAsync(Guid id)
    {
        var entryExits = await GetAllEntryExitAsync();
        var zaer = entryExits.OrderByDescending(x => x.LastModificationTime).ThenBy(x => x.CreationTime).FirstOrDefault(x => x.ZaerId == id);
        return zaer;
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public override async Task<EntryExitZaerDto> CreateAsync(CreateUpdateEntryExitZaerDto input)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        return await base.CreateAsync(input);
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public async Task<EntryExitZaerDto> SetExitDateAsync(Guid zaerId, DateTime ExitDate)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);

        var entryExits = await GetAsync(zaerId);
        var updateEntryExit = await UpdateAsync(entryExits.Id, new CreateUpdateEntryExitZaerDto()
        {
            ZaerId = zaerId,
            EntryDate = entryExits.EntryDate,
            ExitDate = ExitDate,
            MokebId = entryExits.MokebId
        });

        return updateEntryExit;
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public override async Task DeleteAsync(Guid id)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        await base.DeleteAsync(id);
    }

    [Authorize(MokebManagerNgPermissions.Reservation)]
    public override async Task<EntryExitZaerDto> UpdateAsync(Guid id, CreateUpdateEntryExitZaerDto input)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        return await base.UpdateAsync(id, input);
    }



}
