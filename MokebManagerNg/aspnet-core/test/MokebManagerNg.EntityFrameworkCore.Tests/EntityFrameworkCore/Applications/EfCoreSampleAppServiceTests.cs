using MokebManagerNg.Samples;
using Xunit;

namespace MokebManagerNg.EntityFrameworkCore.Applications;

[Collection(MokebManagerNgTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<MokebManagerNgEntityFrameworkCoreTestModule>
{

}
