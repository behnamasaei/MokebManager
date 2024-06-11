using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManager;

public class EntryExitDate : FullAuditedAggregateRoot<Guid>
{
    public Guid ZaerId { get; set; }    
    public Zaer Zaer { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime ExitDate { get; set; }
}
