using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Entities.Caching;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class MokebAppService : CrudAppService<Mokeb, MokebDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateMokebDto, CreateUpdateMokebDto>,
    IMokebAppService
{
    private readonly IDistributedCache<PagedResultDto<MokebDto>> _mokebListCache;
    private readonly EntryExitZaerAppService _entryExitZaerDate;

    public MokebAppService(IRepository<Mokeb, Guid> repository,
    IDistributedCache<PagedResultDto<MokebDto>> mokebListCache,
    EntryExitZaerAppService entryExitZaerDate) : base(repository)
    {
        _mokebListCache = mokebListCache;
        _entryExitZaerDate = entryExitZaerDate;
    }

    public async Task<PagedResultDto<MokebDto>> GetAllListAsync()
    {
        string cacheKey = "MokebDtoList_cache";

        // Try to get data from the cache
        var cachedData = await _mokebListCache.GetAsync(cacheKey);

        if (cachedData != null)
        {
            return cachedData;
        }

        var data = await base.GetListAsync(new PagedAndSortedResultRequestDto { SkipCount = 0, MaxResultCount = 1000 });
        await _mokebListCache.SetAsync(cacheKey, data);
        return data;
    }

    public override async Task<MokebDto> CreateAsync(CreateUpdateMokebDto input)
    {
        string cacheKey = "MokebDtoList_cache";
        await _mokebListCache.RemoveAsync(cacheKey);
        return await base.CreateAsync(input);
    }

    public override async Task<MokebDto> UpdateAsync(Guid id, CreateUpdateMokebDto input)
    {
        string cacheKey = "MokebDtoList_cache";
        await _mokebListCache.RemoveAsync(cacheKey);
        return await base.UpdateAsync(id, input);
    }

    public async Task<List<MokebCapacityDto>> GetMokebCapacityToNight()
    {
        var mokebs = await GetAllListAsync();
        var reservations = await _entryExitZaerDate.GetAllEntryExitAsync();
        List<MokebCapacityDto> mokebCapacityToNight = new();
        // Get the current date and time
        DateTime now = DateTime.Now;
        // Set the specific date and time
        DateTime entryDate = new DateTime(now.Year, now.Month, now.Day, 11, 0, 0, 0, DateTimeKind.Utc);

        foreach (var mokeb in mokebs.Items)
        {
            mokebCapacityToNight.Add(new MokebCapacityDto
            {
                Mokeb = mokeb,
                MokebId = mokeb.Id,
                FreeCapacityToNight = mokeb.Capacity - reservations.Count(x => x.MokebId == mokeb.Id && x.EntryDate == entryDate)
            });
        }

        return mokebCapacityToNight;
    }
}
