using System;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace MokebManagerNg.Domain.CreateUpdateDtos;

public class CreateUpdateZaerDto : Entity<Guid>
{
    public string? Name { get; set; }
    public string? Family { get; set; }
    public Gender Gender { get; set; }
    public string ImageAddress { get; set; }
    public string PassportNo { get; set; }
    public Guid MokebId { get; set; }
    public long? PhoneNumber { get; set; }
    public string? State { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}
