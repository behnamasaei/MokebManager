using MokebManager.Samples;
using Xunit;

namespace MokebManager.EntityFrameworkCore.Applications;

[Collection(MokebManagerTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<MokebManagerEntityFrameworkCoreTestModule>
{

}
