using Xunit;

namespace MokebManager.EntityFrameworkCore;

[CollectionDefinition(MokebManagerTestConsts.CollectionDefinitionName)]
public class MokebManagerEntityFrameworkCoreCollection : ICollectionFixture<MokebManagerEntityFrameworkCoreFixture>
{

}
