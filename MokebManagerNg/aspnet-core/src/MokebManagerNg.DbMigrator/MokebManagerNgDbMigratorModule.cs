using MokebManagerNg.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace MokebManagerNg.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(MokebManagerNgEntityFrameworkCoreModule),
    typeof(MokebManagerNgApplicationContractsModule)
    )]
public class MokebManagerNgDbMigratorModule : AbpModule
{
}
