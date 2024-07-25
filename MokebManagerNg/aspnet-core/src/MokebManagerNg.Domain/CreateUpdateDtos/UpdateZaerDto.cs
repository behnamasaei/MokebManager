using System;
using System.ComponentModel.DataAnnotations;

namespace MokebManagerNg;

public class UpdateZaerDto
{
    public string? Name { get; set; }
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
