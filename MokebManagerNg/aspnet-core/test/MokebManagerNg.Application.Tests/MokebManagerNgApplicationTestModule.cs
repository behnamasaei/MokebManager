using Volo.Abp.Modularity;

namespace MokebManagerNg;

[DependsOn(
    typeof(MokebManagerNgApplicationModule),
    typeof(MokebManagerNgDomainTestModule)
)]
public class MokebManagerNgApplicationTestModule : AbpModule
{

}
