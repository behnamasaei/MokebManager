using Volo.Abp.Modularity;

namespace MokebManagerNg;

public abstract class MokebManagerNgApplicationTestBase<TStartupModule> : MokebManagerNgTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
