using System;
using Volo.Abp.Domain.Entities;

namespace MokebManagerNg;

public class MokebState : AggregateRoot<Guid>
{
    public Guid MokebId { get; set; }
    public Mokeb? Mokeb { get; set; }
    public Guid ZaerId { get; set; }
    public Zaer? Zaer { get; set; }
    public int State { get; set; }
}
