using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
// using MokebManagerNg.Domain.CreateUpdateDtos;

namespace MokebManagerNg;

public interface IZaerAppService :
    ICrudAppService<
        ZaerDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateZaerDto,
        UpdateZaerDto>
{
    public Task<ZaerDto> CreateNewWithIdAsync(CreateZaerDto input);
    public Task<List<ZaerDto>> GetSearchAsync(string text);

}
