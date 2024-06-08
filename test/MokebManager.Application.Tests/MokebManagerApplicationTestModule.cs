using Volo.Abp.Modularity;

namespace MokebManager;

[DependsOn(
    typeof(MokebManagerApplicationModule),
    typeof(MokebManagerDomainTestModule)
)]
public class MokebManagerApplicationTestModule : AbpModule
{

}
