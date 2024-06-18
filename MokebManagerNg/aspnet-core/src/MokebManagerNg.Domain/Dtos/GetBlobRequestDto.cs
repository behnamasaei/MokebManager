using System;
using System.ComponentModel.DataAnnotations;

namespace MokebManagerNg;

public class GetBlobRequestDto
{
    [Required]
    public string Name { get; set; }
}
