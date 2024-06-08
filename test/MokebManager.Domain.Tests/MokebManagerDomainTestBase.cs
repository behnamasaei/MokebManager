using Volo.Abp.Modularity;

namespace MokebManager;

/* Inherit from this class for your domain layer tests. */
public abstract class MokebManagerDomainTestBase<TStartupModule> : MokebManagerTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
