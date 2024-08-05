using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.BlobStoring;
using System.Net.Http;
using Volo.Abp.Content;
using Volo.Abp.Caching;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using MokebManagerNg.Permissions;
using Volo.Abp;

namespace MokebManagerNg;

// [Authorize(MokebManagerNgPermissions.Zaer)]
public class ZaerAppService : CrudAppService<Zaer, ZaerDto, Guid, PagedAndSortedResultRequestDto,
                      CreateZaerDto, UpdateZaerDto>,
  IZaerAppService
{
    IRepository<Zaer, Guid> _repository;
    private readonly IBlobContainer _blobContainer;
    private readonly StorageAppService _storageAppService;
    private readonly IFileAppService _fileAppService;
    private readonly IDistributedCache<List<EntryExitZaerDto>> _entryExitListCache;

    public ZaerAppService(IRepository<Zaer, Guid> repository, IBlobContainer blobContainer, StorageAppService storageAppService, IFileAppService fileAppService,
    IDistributedCache<List<EntryExitZaerDto>> entryExitListCache) : base(repository)
    {
        _repository = repository;
        _blobContainer = blobContainer;
        _storageAppService = storageAppService;
        _fileAppService = fileAppService;
        _entryExitListCache = entryExitListCache;
    }


    // [Authorize(MokebManagerNgPermissions.ZaerRead)]
    public override Task<PagedResultDto<ZaerDto>> GetListAsync(PagedAndSortedResultRequestDto input)
    {
        return base.GetListAsync(input);
    }

    public async override Task<ZaerDto> CreateAsync(CreateZaerDto input)
    {
        if (await _repository.AnyAsync(x => x.PassportNo == input.PassportNo))
            throw new UserFriendlyException($"پاسپورت تکراری می باشد.", code: "307");
        return await base.CreateAsync(input);
    }


    // [Authorize(MokebManagerNgPermissions.ZaerCreate)]
    public async Task<ZaerDto> CreateNewWithIdAsync(CreateZaerDto input)
    {
        if (await _repository.AnyAsync(x => x.PassportNo == input.PassportNo))
            throw new UserFriendlyException($"پاسپورت تکراری می باشد.", code: "307");


        string cacheKey = "AllEntryExit_cache";
        await _entryExitListCache.RemoveAsync(cacheKey);
        var entity = ObjectMapper.Map<CreateZaerDto, Zaer>(input);
        var response = await _repository.InsertAsync(entity, autoSave: true);

        return ObjectMapper.Map<Zaer, ZaerDto>(response);
    }

    // [Authorize(MokebManagerNgPermissions.ZaerRead)]
    public async Task<ZaerDto> GetWithDetailAsync(Guid id)
    {
        var queryable = await _repository.WithDetailsAsync(e => e.EntryExitZaerDates,
            e => e.ClockEntryExits, e => e.Mokeb, e => e.MokebState);
        var query = queryable.Where(x => x.Id == id);
        var dataWithDetail = await AsyncExecuter.FirstOrDefaultAsync(query);

        if (dataWithDetail == null)
            throw new UserFriendlyException($"زائری یافت نشد.");

        return ObjectMapper.Map<Zaer, ZaerDto>(dataWithDetail);
    }


    // [Authorize(MokebManagerNgPermissions.ZaerRead)]
    public async Task<PagedResultDto<ZaerDto>> GetListWithDetailAsync(PagedAndSortedResultRequestDto input)
    {
        var queryable = await _repository.WithDetailsAsync(
            e => e.EntryExitZaerDates,
            e => e.ClockEntryExits,
            e => e.Mokeb,
            e => e.MokebState
        );

        var dataWithDetail = await AsyncExecuter.ToListAsync(queryable);

        var orderedData = dataWithDetail
            .OrderByDescending(o => o.EntryExitZaerDates.OrderByDescending(ee => ee.EntryDate).FirstOrDefault()?.EntryDate)
            .ToList();

        var paginatedData = orderedData
            .Skip(input.SkipCount)
            .Take(input.MaxResultCount)
            .ToList();

        var response = new PagedResultDto<ZaerDto>()
        {
            Items = ObjectMapper.Map<List<Zaer>, List<ZaerDto>>(paginatedData),
            TotalCount = orderedData.Count
        };


        return response;
    }


    // [Authorize(MokebManagerNgPermissions.ZaerDelete)]
    public override async Task DeleteAsync(Guid id)
    {
        await _entryExitListCache.RemoveAsync("AllEntryExit_cache");
        await base.DeleteAsync(id);
    }

    // [Authorize(MokebManagerNgPermissions.ZaerUpdate)]
    public override Task<ZaerDto> UpdateAsync(Guid id, UpdateZaerDto input)
    {
        return base.UpdateAsync(id, input);
    }

    // [Authorize(MokebManagerNgPermissions.ZaerRead)]
    public async Task<List<ZaerDto>> GetSearchAsync(string text)
    {
        var zaers = await _repository.GetListAsync(x => x.PassportNo.Contains(text) || x.Name.Contains(text)
          || x.PhoneNumber.ToString().Contains(text) || x.Id.ToString() == text);
        return ObjectMapper.Map<List<Zaer>, List<ZaerDto>>(zaers);
    }


    // [Authorize(MokebManagerNgPermissions.ZaerRead)]
    public async Task<ZaerDto> GetWithPassportNoAsync(string passportNo)
    {
        var queryable = await _repository.WithDetailsAsync(e => e.EntryExitZaerDates,
            e => e.ClockEntryExits, e => e.Mokeb, e => e.MokebState);
        var query = queryable.Where(x => x.PassportNo == passportNo);
        var dataWithDetail = await AsyncExecuter.FirstOrDefaultAsync(query);

        if (dataWithDetail == null)
            throw new UserFriendlyException($"زائری با این شماره پاسپورت یافت نشد.");

        return ObjectMapper.Map<Zaer, ZaerDto>(dataWithDetail);
    }
}
