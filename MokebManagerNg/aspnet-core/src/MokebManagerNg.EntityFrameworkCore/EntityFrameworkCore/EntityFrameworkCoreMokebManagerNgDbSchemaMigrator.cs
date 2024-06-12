using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MokebManagerNg.Data;
using Volo.Abp.DependencyInjection;

namespace MokebManagerNg.EntityFrameworkCore;

public class EntityFrameworkCoreMokebManagerNgDbSchemaMigrator
    : IMokebManagerNgDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreMokebManagerNgDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the MokebManagerNgDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<MokebManagerNgDbContext>()
            .Database
            .MigrateAsync();
    }
}
