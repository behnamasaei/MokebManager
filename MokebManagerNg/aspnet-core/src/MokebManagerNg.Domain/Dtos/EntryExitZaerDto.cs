using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Domain.Entities.Events.Distributed;

namespace MokebManagerNg.Domain.Dtos;

public class EntryExitZaerDto : AuditedEntityDto<Guid>
{
    public Guid ZaerId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime ExitDate { get; set; }
    public Guid MokebId { get; set; }
}
