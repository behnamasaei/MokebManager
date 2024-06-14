using System;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg;

public class EntryExitZaer : AggregateRoot<Guid>
{
    public Guid ZaerId { get; set; }
    public virtual Zaer Zaer { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime ExitDate { get; set; }
}
