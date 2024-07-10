using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace MokebManagerNg;

public interface IMokebStateAppService : ICrudAppService<
        MokebStateDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateUpdateMokebStateDto,
        CreateUpdateMokebStateDto>
{

        public Task<List<MokebStateDto>> GetListWithDetailAsync();
}
