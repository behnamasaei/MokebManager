using System;
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

    private readonly IDistributedCache<MokebDto> _mokebCache;
    private readonly IDistributedCache<PagedResultDto<MokebDto>> _mokebListCache;


    public MokebAppService(IRepository<Mokeb, Guid> repository, IDistributedCache<MokebDto> mokebCache,
    IDistributedCache<PagedResultDto<MokebDto>> mokebListCache) : base(repository)
    {
        _mokebCache = mokebCache;
        _mokebListCache = mokebListCache;
    }

    // public override async Task<MokebDto> GetAsync(Guid id)
    // {
    //     // Try to get data from the cache
    //     var cachedData = await _mokebCache.GetAsync(id.ToString());
    //     if (cachedData != null)
    //     {
    //         return cachedData;
    //     }

    //     // If cache is empty, retrieve data from the source 
    //     var data = await base.GetAsync(id);

    //     await _mokebCache.SetAsync(id.ToString(), data);

    //     return data;
    // }

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
}
