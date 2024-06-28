using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace MokebManagerNg;

public interface IClockEntryExitAppService :
    ICrudAppService<
        ClockEntryExitDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateClockEntryExitDto,
        CreateUpdateClockEntryExitDto>
{

}