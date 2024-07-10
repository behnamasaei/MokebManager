using System;

namespace MokebManagerNg;

public class CreateUpdateMokebStateDto
{
    public Guid MokebId { get; set; }
    public Guid ZaerId { get; set; }
    public int State { get; set; }
}
