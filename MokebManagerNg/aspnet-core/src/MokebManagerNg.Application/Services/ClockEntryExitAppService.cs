using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

public class ClockEntryExitAppService : CrudAppService<ClockEntryExit, ClockEntryExitDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateClockEntryExitDto, CreateUpdateClockEntryExitDto>,
    IClockEntryExitAppService
{
    public ClockEntryExitAppService(IRepository<ClockEntryExit, Guid> repository) : base(repository)
    {
    }
}
