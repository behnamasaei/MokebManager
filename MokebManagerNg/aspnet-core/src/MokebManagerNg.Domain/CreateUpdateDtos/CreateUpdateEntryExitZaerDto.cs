﻿using System;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg.Domain.CreateUpdateDtos;

public class CreateUpdateEntryExitZaerDto : Entity<Guid>
{
    public Guid ZaerId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime ExitDate { get; set; }
}
