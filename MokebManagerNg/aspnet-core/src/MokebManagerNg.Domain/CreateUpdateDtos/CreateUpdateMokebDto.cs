using System;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg.Domain.CreateUpdateDtos;

public class CreateUpdateMokebDto : Entity<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }
}
