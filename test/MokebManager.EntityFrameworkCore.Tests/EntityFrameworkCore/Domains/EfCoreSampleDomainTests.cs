using MokebManager.Samples;
using Xunit;

namespace MokebManager.EntityFrameworkCore.Domains;

[Collection(MokebManagerTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<MokebManagerEntityFrameworkCoreTestModule>
{

}
