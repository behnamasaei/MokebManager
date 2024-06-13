﻿using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Domain.Entities.Events.Distributed;

namespace MokebManagerNg.Domain.Dtos;

public class ZaerDto : EntityDto<Guid>
{
    public string? Name { get; set; }
    public string? Family { get; set; }
    public Gender Gender { get; set; }
    public ICollection<EntryExitZaerDto> EntryExitZaerDates { get; set; }
    public string ImageAddress { get; set; }
    public string PassportNo { get; set; }
    public Guid MokebId { get; set; }
    public Mokeb Mokeb { get; set; }
    public long? PhoneNumber { get; set; }
    public string? State { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}
