using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class MokebStateAppService : CrudAppService<MokebState, MokebStateDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateMokebStateDto, CreateUpdateMokebStateDto>,
    IMokebStateAppService

{

    private IRepository<MokebState, Guid> _repository;
    private IRepository<Mokeb, Guid> _mokebRepository;
    private MokebAppService _mokebAppService;
    private readonly IDistributedCache<List<MokebStateDto>> _mokebStateListCache;
    private const string cacheKey = "MokebStateList_cache";


    public MokebStateAppService(IRepository<MokebState, Guid> repository,
    IRepository<Mokeb, Guid> mokebRepository,
    MokebAppService mokebAppService,
    IDistributedCache<List<MokebStateDto>> mokebStateListCache) : base(repository)
    {
        _mokebStateListCache = mokebStateListCache;
        _mokebRepository = mokebRepository;
        _mokebAppService = mokebAppService;
        _repository = repository;
    }


    public async Task<List<MokebStateDto>> GetAllListAsync()
    {

        // Try to get data from the cache
        var cachedData = await _mokebStateListCache.GetAsync(cacheKey);

        if (cachedData != null)
        {
            return cachedData;
        }

        var data = ObjectMapper.Map<List<MokebState>, List<MokebStateDto>>(await _repository.GetListAsync());
        await _mokebStateListCache.SetAsync(cacheKey, data);
        return data;
    }


    public async Task<List<MokebStateDto>> GetListWithDetailAsync()
    {
        var queryable = await _repository.WithDetailsAsync(e => e.Zaer, e => e.Mokeb, e => e.Zaer.EntryExitZaerDates);

        var dataWithDetailList = await AsyncExecuter.ToListAsync(queryable);

        return ObjectMapper.Map<List<MokebState>, List<MokebStateDto>>(dataWithDetailList);
    }

    public async Task<int> GetFreeStateAsync(Guid MokebId)
    {
        DateTime nowDate = DateTime.Now;

        var mokeb = await _mokebAppService.GetAsync(MokebId);

        var mokebStates = await GetListWithDetailAsync();
        mokebStates = mokebStates
            .Where(x => x.MokebId == MokebId &&
                        x.Zaer.EntryExitZaerDates
                           .OrderByDescending(o => o.ExitDate)
                           .FirstOrDefault()?.ExitDate > nowDate)
            .ToList();


        var firstFreeState = FindFirstMissingNumber(mokebStates, mokeb.Capacity);

        // Some logic
        if (firstFreeState == -1)
        {
            // throw new MokebManagerException();
            throw new UserFriendlyException($"ظرفیت موکب {mokeb.Name} پر شده اشت.");
        }

        return firstFreeState;
    }


    public static int FindFirstMissingNumber(List<MokebStateDto> mokebStates, int endRange)
    {
        // Create a HashSet of all states in mokebStates
        HashSet<int> existingStates = new HashSet<int>(mokebStates.Select(ms => ms.State));


        for (int i = 1; i <= endRange; i++)
        {
            if (!existingStates.Contains(i))
            {
                return i;
            }
        }

        return -1;
    }


    public override async Task<MokebStateDto> CreateAsync(CreateUpdateMokebStateDto input)
    {
        await _mokebStateListCache.RemoveAsync(cacheKey);
        return await base.CreateAsync(input);
    }


    public override async Task DeleteAsync(Guid id)
    {
        await _mokebStateListCache.RemoveAsync(cacheKey);
        await base.DeleteAsync(id);
    }


    public override async Task<MokebStateDto> UpdateAsync(Guid id, CreateUpdateMokebStateDto input)
    {
        await _mokebStateListCache.RemoveAsync(cacheKey);
        return await base.UpdateAsync(id, input);
    }
}
