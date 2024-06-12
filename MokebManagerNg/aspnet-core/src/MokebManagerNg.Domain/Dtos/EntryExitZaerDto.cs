using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg.Domain.Dtos;

public class EntryExitZaerDto : AuditedEntity<Guid>
{
    public Guid ZaerId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime ExitDate { get; set; }
}
