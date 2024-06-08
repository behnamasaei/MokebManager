using Volo.Abp.Modularity;

namespace MokebManager;

[DependsOn(
    typeof(MokebManagerDomainModule),
    typeof(MokebManagerTestBaseModule)
)]
public class MokebManagerDomainTestModule : AbpModule
{

}
