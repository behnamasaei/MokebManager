using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;
using Volo.Abp.BlobStoring;
using Volo.Abp.BlobStoring.FileSystem;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.BackgroundWorkers.Quartz;
using System.Threading.Tasks;
using Volo.Abp;

namespace MokebManagerNg;

[DependsOn(
    typeof(MokebManagerNgDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(MokebManagerNgApplicationContractsModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
[DependsOn(typeof(AbpBlobStoringModule))]
[DependsOn(typeof(AbpBlobStoringFileSystemModule))]

[DependsOn(typeof(AbpBackgroundWorkersQuartzModule))]
public class MokebManagerNgApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {


        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<MokebManagerNgApplicationModule>();
        });

        Configure<AbpBlobStoringOptions>(options =>
        {

            options.Containers.ConfigureDefault(container =>
            {
                container.UseFileSystem(fileSystem =>
                {
                    fileSystem.BasePath = @".\images";
                });
            });
        });

    }
}
