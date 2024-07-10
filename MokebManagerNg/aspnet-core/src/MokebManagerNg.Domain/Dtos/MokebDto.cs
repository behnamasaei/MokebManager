﻿using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Events.Distributed;


namespace MokebManagerNg.Domain.Dtos;

public class MokebDto : AuditedEntityDto<Guid>
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public int Capacity { get; set; }

    public virtual ICollection<ZaerDto>? Zaers { get; set; }
    public virtual ICollection<EntryExitZaerDto>? EntryExitZaers { get; set; }
    public virtual ICollection<MokebStateDto>? MokebStates { get; set; }

}
