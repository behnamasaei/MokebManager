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
using Volo.Abp.Domain.Entities.Caching;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;


[Authorize(MokebManagerNgPermissions.Mokeb)]
public class MokebAppService : CrudAppService<Mokeb, MokebDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateMokebDto, CreateUpdateMokebDto>,
    IMokebAppService
{
    private readonly IDistributedCache<PagedResultDto<MokebDto>> _mokebListCache;
    private readonly IDistributedCache<List<EntryExitZaerDto>> _entryExitListCache;
    private readonly EntryExitZaerAppService _entryExitZaerDate;

    public MokebAppService(IRepository<Mokeb, Guid> repository,
    IDistributedCache<PagedResultDto<MokebDto>> mokebListCache,
    EntryExitZaerAppService entryExitZaerDate,
    IDistributedCache<List<EntryExitZaerDto>> entryExitListCache = null) : base(repository)
    {
        _mokebListCache = mokebListCache;
        _entryExitZaerDate = entryExitZaerDate;
        _entryExitListCache = entryExitListCache;
    }

    [Authorize(MokebManagerNgPermissions.MokebRead)]
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

    [Authorize(MokebManagerNgPermissions.MokebRead)]
    public override Task<MokebDto> GetAsync(Guid id)
    {
        return base.GetAsync(id);
    }


    [Authorize(MokebManagerNgPermissions.MokebCreate)]
    public override async Task<MokebDto> CreateAsync(CreateUpdateMokebDto input)
    {
        string cacheKey = "MokebDtoList_cache";
        await _mokebListCache.RemoveAsync(cacheKey);
        await _entryExitListCache.RemoveAsync("AllEntryExit_cache");
        return await base.CreateAsync(input);
    }


    [Authorize(MokebManagerNgPermissions.MokebUpdate)]
    public override async Task<MokebDto> UpdateAsync(Guid id, CreateUpdateMokebDto input)
    {
        string cacheKey = "MokebDtoList_cache";
        await _mokebListCache.RemoveAsync(cacheKey);
        await _entryExitListCache.RemoveAsync("AllEntryExit_cache");
        return await base.UpdateAsync(id, input);
    }


    [Authorize(MokebManagerNgPermissions.MokebDelete)]
    public override async Task DeleteAsync(Guid id)
    {
        string cacheKey = "MokebDtoList_cache";
        await _mokebListCache.RemoveAsync(cacheKey);
        await _entryExitListCache.RemoveAsync("AllEntryExit_cache");
        await base.DeleteAsync(id);
    }


    [Authorize(MokebManagerNgPermissions.MokebRead)]
    public async Task<List<MokebCapacityDto>> GetMokebCapacityToNight()
    {
        var mokebs = await GetAllListAsync();
        var reservations = await _entryExitZaerDate.GetAllEntryExitAsync();
        List<MokebCapacityDto> mokebCapacityToNight = new();

        // Get the current date and time
        DateTime now = DateTime.UtcNow;
        // now = now.AddDays(2);

        // Set the specific date and time
        DateTime nowDate = new DateTime(now.Year, now.Month, now.Day, 12, 0, 0, 0, DateTimeKind.Utc);

        Console.WriteLine(nowDate.ToString());

        foreach (var mokeb in mokebs.Items)
        {
            mokebCapacityToNight.Add(new MokebCapacityDto
            {
                Mokeb = mokeb,
                MokebId = mokeb.Id,
                FreeCapacityToNight = mokeb.Capacity - reservations.Count(x => x.MokebId == mokeb.Id &&
                 nowDate < x.ExitDate)
            });
        }

        return mokebCapacityToNight;
    }
}
