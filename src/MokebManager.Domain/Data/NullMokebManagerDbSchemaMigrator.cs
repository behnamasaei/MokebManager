using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace MokebManager.Data;

/* This is used if database provider does't define
 * IMokebManagerDbSchemaMigrator implementation.
 */
public class NullMokebManagerDbSchemaMigrator : IMokebManagerDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
