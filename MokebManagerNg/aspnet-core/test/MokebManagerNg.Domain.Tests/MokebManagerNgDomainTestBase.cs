using Volo.Abp.Modularity;

namespace MokebManagerNg;

/* Inherit from this class for your domain layer tests. */
public abstract class MokebManagerNgDomainTestBase<TStartupModule> : MokebManagerNgTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
