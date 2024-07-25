using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using MokebManagerNg.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace MokebManagerNg;

// [Authorize(MokebManagerNgPermissions.ClockEntryExit)]
public class ClockEntryExitAppService : CrudAppService<ClockEntryExit, ClockEntryExitDto, Guid, PagedAndSortedResultRequestDto,
                        CreateUpdateClockEntryExitDto, CreateUpdateClockEntryExitDto>,
    IClockEntryExitAppService
{
    public ClockEntryExitAppService(IRepository<ClockEntryExit, Guid> repository) : base(repository)
    {
    }

    public override Task<ClockEntryExitDto> CreateAsync(CreateUpdateClockEntryExitDto input)
    {
        input.EntryExitClock = DateTime.Now;
        return base.CreateAsync(input);
    }
}
