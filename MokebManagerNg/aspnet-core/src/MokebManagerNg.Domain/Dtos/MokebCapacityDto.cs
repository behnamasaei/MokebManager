using System;
using MokebManagerNg.Domain.Dtos;

namespace MokebManagerNg;

public class MokebCapacityDto
{
    public Guid MokebId { get; set; }
    public MokebDto Mokeb { get; set; }
    public int FreeCapacityToNight { get; set; }
}
