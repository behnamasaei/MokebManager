using System;
using Volo.Abp.Domain.Entities;

namespace MokebManagerNg;

public class ClockEntryExit : AggregateRoot<Guid>
{
    public Guid ZaerId { get; set; }
    public virtual Zaer Zaer { get; set; }
    public DateTime EntryExitClock { get; set; }
}