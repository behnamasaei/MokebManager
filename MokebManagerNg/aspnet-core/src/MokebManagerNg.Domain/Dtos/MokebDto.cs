using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Events.Distributed;


namespace MokebManagerNg.Domain.Dtos;

public class MokebDto : EntityDto<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }
}
