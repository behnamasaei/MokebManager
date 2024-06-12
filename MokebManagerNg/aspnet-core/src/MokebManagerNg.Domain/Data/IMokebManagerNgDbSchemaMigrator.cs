using System.Threading.Tasks;

namespace MokebManagerNg.Data;

public interface IMokebManagerNgDbSchemaMigrator
{
    Task MigrateAsync();
}
