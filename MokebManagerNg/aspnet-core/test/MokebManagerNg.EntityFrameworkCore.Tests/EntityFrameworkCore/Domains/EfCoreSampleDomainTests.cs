using MokebManagerNg.Samples;
using Xunit;

namespace MokebManagerNg.EntityFrameworkCore.Domains;

[Collection(MokebManagerNgTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<MokebManagerNgEntityFrameworkCoreTestModule>
{

}
