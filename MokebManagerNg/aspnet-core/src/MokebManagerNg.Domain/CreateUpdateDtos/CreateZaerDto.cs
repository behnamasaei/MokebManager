using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace MokebManagerNg;

public class CreateZaerDto : EntityDto<Guid>
{
    public string? Name { get; set; }
    public string? Family { get; set; }
    [Required]
    public Gender Gender { get; set; }
    [Required]
    public string PassportNo { get; set; }
    [Required]
    public Guid MokebId { get; set; }
    public long? PhoneNumber { get; set; }
    public string? State { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}
