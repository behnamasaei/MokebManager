using MokebManager.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace MokebManager.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(MokebManagerEntityFrameworkCoreModule),
    typeof(MokebManagerApplicationContractsModule)
    )]
public class MokebManagerDbMigratorModule : AbpModule
{
}
