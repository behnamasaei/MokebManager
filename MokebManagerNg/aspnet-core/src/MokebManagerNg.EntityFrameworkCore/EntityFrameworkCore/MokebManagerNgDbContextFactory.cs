using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MokebManagerNg.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class MokebManagerNgDbContextFactory : IDesignTimeDbContextFactory<MokebManagerNgDbContext>
{
    public MokebManagerNgDbContext CreateDbContext(string[] args)
    {
        MokebManagerNgEfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<MokebManagerNgDbContext>()
            .UseSqlite(configuration.GetConnectionString("Default"));

        return new MokebManagerNgDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../MokebManagerNg.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
