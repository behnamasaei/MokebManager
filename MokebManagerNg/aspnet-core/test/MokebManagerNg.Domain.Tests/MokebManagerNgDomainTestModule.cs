using Volo.Abp.Modularity;

namespace MokebManagerNg;

[DependsOn(
    typeof(MokebManagerNgDomainModule),
    typeof(MokebManagerNgTestBaseModule)
)]
public class MokebManagerNgDomainTestModule : AbpModule
{

}
