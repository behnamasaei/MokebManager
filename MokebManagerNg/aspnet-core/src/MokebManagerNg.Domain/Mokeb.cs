using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg;

public class Mokeb :  FullAuditedAggregateRoot<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }
    public ICollection<Zaer> Zaers { get; set; }
}
