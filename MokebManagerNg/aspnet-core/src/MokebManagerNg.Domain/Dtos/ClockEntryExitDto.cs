using System;
using Volo.Abp.Application.Dtos;

namespace MokebManagerNg;

public class ClockEntryExitDto : EntityDto<Guid>
{
    public Guid ZaerId { get; set; }
    public virtual Zaer? Zaer { get; set; }
    public DateTime EntryExitClock { get; set; }
}
