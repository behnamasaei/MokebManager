using Volo.Abp.Modularity;

namespace MokebManager;

public abstract class MokebManagerApplicationTestBase<TStartupModule> : MokebManagerTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
