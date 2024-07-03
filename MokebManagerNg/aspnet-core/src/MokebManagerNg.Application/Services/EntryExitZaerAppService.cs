using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace MokebManagerNg;

[Authorize("MokebManagerNg.Reservation")]
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

    [Authorize("MokebManagerNg.Reservation")]
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

    [Authorize("MokebManagerNg.Reservation")]
    public override async Task<EntryExitZaerDto> GetAsync(Guid id)
    {
        var entryExits = await GetAllEntryExitAsync();
        var zaer = entryExits.OrderByDescending(x => x.LastModificationTime).ThenBy(x => x.CreationTime).FirstOrDefault(x => x.ZaerId == id);
        return zaer;
    }

    [Authorize("MokebManagerNg.Reservation")]
    public override async Task<EntryExitZaerDto> CreateAsync(CreateUpdateEntryExitZaerDto input)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        return await base.CreateAsync(input);
    }

    [Authorize("MokebManagerNg.Reservation")]
    public override async Task DeleteAsync(Guid id)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        await base.DeleteAsync(id);
    }

    [Authorize("MokebManagerNg.Reservation")]
    public override async Task<EntryExitZaerDto> UpdateAsync(Guid id, CreateUpdateEntryExitZaerDto input)
    {
        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        return await base.UpdateAsync(id, input);
    }



}
