using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg;

public class Mokeb : AggregateRoot<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }
    public virtual ICollection<Zaer>? Zaers { get; set; }
    public virtual ICollection<EntryExitZaer>? EntryExitZaers { get; set; }
    public virtual ICollection<MokebState>? MokebStates { get; set; }
}
