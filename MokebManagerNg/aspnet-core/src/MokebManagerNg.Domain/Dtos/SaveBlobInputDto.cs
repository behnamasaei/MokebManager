using System;
using System.ComponentModel.DataAnnotations;

namespace MokebManagerNg;

public class SaveBlobInputDto
{
    public byte[] Content { get; set; }

    [Required]
    public string Name { get; set; }
}
