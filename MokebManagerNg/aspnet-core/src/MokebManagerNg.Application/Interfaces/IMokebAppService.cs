using System;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
// using MokebManagerNg.Domain.CreateUpdateDtos;

namespace MokebManagerNg;

public interface IMokebAppService :
    ICrudAppService<
        MokebDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateMokebDto,
        CreateUpdateMokebDto>
{

}
