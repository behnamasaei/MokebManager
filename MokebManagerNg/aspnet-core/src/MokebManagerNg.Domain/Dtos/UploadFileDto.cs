using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace MokebManagerNg;

public class UploadFileDto
{
    [Required]
    public IFormFile File { get; set; }

    [Required]
    public string Name { get; set; }

}
