﻿using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace MokebManagerNg.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class MokebManagerNgDbContext :
    AbpDbContext<MokebManagerNgDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public DbSet<Mokeb> Mokebs { get; set; }
    public DbSet<Zaer> Zaers { get; set; }
    public DbSet<EntryExitZaer> EntryExitDates { get; set; }
    public DbSet<ClockEntryExit> clockEntryExits { get; set; }
    public DbSet<MokebState> MokebStates { get; set; }


    public MokebManagerNgDbContext(DbContextOptions<MokebManagerNgDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        builder.Entity<Mokeb>(b =>
        {
            b.ToTable(MokebManagerNgConsts.DbTablePrefix + "Mokeb", MokebManagerNgConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasMany(x => x.Zaers).WithOne(x => x.Mokeb).HasForeignKey(x => x.MokebId).OnDelete(DeleteBehavior.Restrict);
            b.HasMany(x => x.EntryExitZaers).WithOne().HasForeignKey(x => x.MokebId).OnDelete(DeleteBehavior.Restrict);
            b.Property(x => x.Name).IsRequired();
            b.HasIndex(x => x.Name).IsUnique();
            b.Property(x => x.Capacity).IsRequired() // If you want to ensure Capacity is always provided
                    .HasAnnotation("MinValue", 0)
                    .HasAnnotation("MaxValue", 10000);
            //...
        });

        builder.Entity<Zaer>(b =>
        {
            b.ToTable(MokebManagerNgConsts.DbTablePrefix + "Zaer", MokebManagerNgConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasOne(x => x.Mokeb).WithMany(x => x.Zaers).HasForeignKey(x => x.MokebId);
            b.HasMany(x => x.EntryExitZaerDates).WithOne(x => x.Zaer).HasForeignKey(x => x.ZaerId).OnDelete(DeleteBehavior.Restrict);
            b.HasMany(x => x.ClockEntryExits).WithOne(x => x.Zaer).HasForeignKey(x => x.ZaerId).OnDelete(DeleteBehavior.Restrict);

            b.Property(x => x.PassportNo).IsRequired();
            b.HasIndex(x => x.Id).IsUnique();
            b.HasIndex(x => x.PassportNo).IsUnique();
            b.HasIndex(x => x.PhoneNumber).IsUnique();
        });

        builder.Entity<EntryExitZaer>(b =>
        {
            b.ToTable(MokebManagerNgConsts.DbTablePrefix + "EntryExitZaer", MokebManagerNgConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasOne(x => x.Zaer).WithMany(x => x.EntryExitZaerDates).HasForeignKey(x => x.ZaerId);
        });

        builder.Entity<ClockEntryExit>(b =>
        {
            b.ToTable(MokebManagerNgConsts.DbTablePrefix + "ClockEntryExit", MokebManagerNgConsts.DbSchema);
            b.ConfigureByConvention(); //auto configure for the base class props
            b.HasOne(x => x.Zaer).WithMany(x => x.ClockEntryExits).HasForeignKey(x => x.ZaerId);
        });

        builder.Entity<MokebState>(b =>
        {
            b.ToTable(MokebManagerNgConsts.DbTablePrefix + "MokebState", MokebManagerNgConsts.DbSchema);
            b.ConfigureByConvention(); // auto configure for the base class props
            b.HasOne(x => x.Zaer).WithOne(x => x.MokebState).HasForeignKey<MokebState>(x => x.ZaerId);
            b.HasOne(x => x.Mokeb).WithMany(x => x.MokebStates).HasForeignKey(x => x.MokebId);
        });
    }
}
