using System;
using MokebManagerNg.Domain.Dtos;
using Volo.Abp.Application.Dtos;

namespace MokebManagerNg;

public class MokebStateDto : AuditedEntityDto<Guid>
{
    public Guid MokebId { get; set; }
    public MokebDto? Mokeb { get; set; }
    public Guid ZaerId { get; set; }
    public ZaerDto? Zaer { get; set; }
    public int State { get; set; }
}
