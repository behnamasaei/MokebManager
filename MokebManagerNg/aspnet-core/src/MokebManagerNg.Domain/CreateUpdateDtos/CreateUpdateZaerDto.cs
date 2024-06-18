

using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using Microsoft.AspNetCore.Http;
using Volo.Abp.Content;

namespace MokebManagerNg.Domain.CreateUpdateDtos;

public class CreateUpdateZaerDto
{
    public string? Name { get; set; }
    public string? Family { get; set; }
    [Required]
    public Gender Gender { get; set; }
    [Required]
    public string PassportNo { get; set; }
    [Required]
    public Guid MokebId { get; set; }
    public string? ImageFileName { get; set; }
    public long? PhoneNumber { get; set; }
    public string? State { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
}
