using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace MokebManagerNg.Data;

/* This is used if database provider does't define
 * IMokebManagerNgDbSchemaMigrator implementation.
 */
public class NullMokebManagerNgDbSchemaMigrator : IMokebManagerNgDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
