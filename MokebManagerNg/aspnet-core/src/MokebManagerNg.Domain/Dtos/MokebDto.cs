using System;
using MokebManagerNg;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg.Domain.Dtos;

public class MokebDto : AuditedEntity<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }
}
