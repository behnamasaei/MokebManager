using System.Threading.Tasks;

namespace MokebManager.Data;

public interface IMokebManagerDbSchemaMigrator
{
    Task MigrateAsync();
}
