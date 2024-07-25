using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MokebManagerNg.EntityFrameworkCore;
using MokebManagerNg.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.LeptonXLite.Bundling;
using Microsoft.OpenApi.Models;
using OpenIddict.Validation.AspNetCore;
using Volo.Abp;
using Volo.Abp.Account;
using Volo.Abp.Account.Web;
using Volo.Abp.AspNetCore.MultiTenancy;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;
using Volo.Abp.AspNetCore.Mvc.UI.Theme.Shared;
using Volo.Abp.AspNetCore.Serilog;
using Volo.Abp.Autofac;
using Volo.Abp.Localization;
using Volo.Abp.Modularity;
using Volo.Abp.Security.Claims;
using Volo.Abp.Swashbuckle;
using Volo.Abp.UI.Navigation.Urls;
using Volo.Abp.VirtualFileSystem;
using Volo.Abp.Caching;
using Volo.Abp.Domain.Entities.Caching;
using MokebManagerNg.Domain.Dtos;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace MokebManagerNg;

[DependsOn(
    typeof(MokebManagerNgHttpApiModule),
    typeof(AbpAutofacModule),
    typeof(AbpAspNetCoreMultiTenancyModule),
    typeof(MokebManagerNgApplicationModule),
    typeof(MokebManagerNgEntityFrameworkCoreModule),
    typeof(AbpAspNetCoreMvcUiLeptonXLiteThemeModule),
    typeof(AbpAccountWebOpenIddictModule),
    typeof(AbpAspNetCoreSerilogModule),
    typeof(AbpSwashbuckleModule)
)]
[DependsOn(typeof(AbpCachingModule))]
public class MokebManagerNgHttpApiHostModule : AbpModule
{
    public override void PreConfigureServices(ServiceConfigurationContext context)
    {
        PreConfigure<OpenIddictBuilder>(builder =>
        {
            builder.AddValidation(options =>
            {
                options.AddAudiences("MokebManagerNg");
                options.UseLocalServer();
                options.UseAspNetCore();
            });
        });

    }

    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var configuration = context.Services.GetConfiguration();
        var hostingEnvironment = context.Services.GetHostingEnvironment();

        ConfigureAuthentication(context);
        ConfigureBundles();
        ConfigureUrls(configuration);
        ConfigureConventionalControllers();
        ConfigureVirtualFileSystem(context);
        ConfigureCors(context, configuration);
        ConfigureSwaggerServices(context, configuration);
        ConfigureCache(context);
        ConfigureMokebManager(context);


        context.Services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.SameSite = SameSiteMode.Lax;
            // options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure cookies are sent only over HTTPS
        });

    }

    private void ConfigureMokebManager(ServiceConfigurationContext context)
    {
        context.Services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        );
    }

    private void ConfigureCache(ServiceConfigurationContext context)
    {
        context.Services.AddEntityCache<Mokeb, MokebDto, Guid>(
            new DistributedCacheEntryOptions
            {
                SlidingExpiration = TimeSpan.FromDays(365)
            });
        context.Services.AddEntityCache<EntryExitZaer, EntryExitZaerDto, Guid>(
            new DistributedCacheEntryOptions
            {
                SlidingExpiration = TimeSpan.FromDays(1)
            }
        );


    }

    private void ConfigureAuthentication(ServiceConfigurationContext context)
    {
        context.Services.ForwardIdentityAuthenticationForBearer(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);
        context.Services.Configure<AbpClaimsPrincipalFactoryOptions>(options =>
        {
            options.IsDynamicClaimsEnabled = true;
        });
    }

    private void ConfigureBundles()
    {
        Configure<AbpBundlingOptions>(options =>
        {
            options.StyleBundles.Configure(
                LeptonXLiteThemeBundles.Styles.Global,
                bundle =>
                {
                    bundle.AddFiles("/global-styles.css");
                }
            );
        });
    }

    private void ConfigureUrls(IConfiguration configuration)
    {
        Configure<AppUrlOptions>(options =>
        {
            options.Applications["MVC"].RootUrl = configuration["App:SelfUrl"];
            options.RedirectAllowedUrls.AddRange(configuration["App:RedirectAllowedUrls"]?.Split(',') ?? Array.Empty<string>());

            options.Applications["Angular"].RootUrl = configuration["App:ClientUrl"];
            options.Applications["Angular"].Urls[AccountUrlNames.PasswordReset] = "account/reset-password";
        });
    }

    private void ConfigureVirtualFileSystem(ServiceConfigurationContext context)
    {
        var hostingEnvironment = context.Services.GetHostingEnvironment();

        if (hostingEnvironment.IsDevelopment())
        {
            Configure<AbpVirtualFileSystemOptions>(options =>
            {
                options.FileSets.ReplaceEmbeddedByPhysical<MokebManagerNgDomainSharedModule>(
                    Path.Combine(hostingEnvironment.ContentRootPath,
                        $"..{Path.DirectorySeparatorChar}MokebManagerNg.Domain.Shared"));
                options.FileSets.ReplaceEmbeddedByPhysical<MokebManagerNgDomainModule>(
                    Path.Combine(hostingEnvironment.ContentRootPath,
                        $"..{Path.DirectorySeparatorChar}MokebManagerNg.Domain"));
                options.FileSets.ReplaceEmbeddedByPhysical<MokebManagerNgApplicationContractsModule>(
                    Path.Combine(hostingEnvironment.ContentRootPath,
                        $"..{Path.DirectorySeparatorChar}MokebManagerNg.Application.Contracts"));
                options.FileSets.ReplaceEmbeddedByPhysical<MokebManagerNgApplicationModule>(
                    Path.Combine(hostingEnvironment.ContentRootPath,
                        $"..{Path.DirectorySeparatorChar}MokebManagerNg.Application"));
            });
        }
    }

    private void ConfigureConventionalControllers()
    {
        Configure<AbpAspNetCoreMvcOptions>(options =>
        {
            options.ConventionalControllers.Create(typeof(MokebManagerNgApplicationModule).Assembly);
        });
    }

    private static void ConfigureSwaggerServices(ServiceConfigurationContext context, IConfiguration configuration)
    {
        context.Services.AddAbpSwaggerGenWithOAuth(
            configuration["AuthServer:Authority"]!,
            new Dictionary<string, string>
            {
                    {"MokebManagerNg", "MokebManagerNg API"}
            },
            options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "MokebManagerNg API", Version = "v1" });
                options.DocInclusionPredicate((docName, description) => true);
                options.CustomSchemaIds(type => type.FullName);
            });
    }

    private void ConfigureCors(ServiceConfigurationContext context, IConfiguration configuration)
    {
        context.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                    .WithOrigins(configuration["App:CorsOrigins"]?
                        .Split(",", StringSplitOptions.RemoveEmptyEntries)
                        .Select(o => o.RemovePostFix("/"))
                        .ToArray() ?? Array.Empty<string>())
                    .WithAbpExposedHeaders()
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .SetIsOriginAllowed(origin => true)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
    }

    public override void OnApplicationInitialization(ApplicationInitializationContext context)
    {
        var app = context.GetApplicationBuilder();
        var env = context.GetEnvironment();

        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseAbpRequestLocalization();

        if (!env.IsDevelopment())
        {
            app.UseErrorPage();
        }

        app.UseCorrelationId();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors();
        app.UseAuthentication();
        app.UseAbpOpenIddictValidation();

        if (MultiTenancyConsts.IsEnabled)
        {
            app.UseMultiTenancy();
        }
        app.UseUnitOfWork();
        app.UseDynamicClaims();
        app.UseAuthorization();

        app.UseSwagger();
        app.UseAbpSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "MokebManagerNg API");

            var configuration = context.ServiceProvider.GetRequiredService<IConfiguration>();
            c.OAuthClientId(configuration["AuthServer:SwaggerClientId"]);
            c.OAuthScopes("MokebManagerNg");
        });

        app.UseAuditing();
        app.UseAbpSerilogEnrichers();
        app.UseConfiguredEndpoints();
    }
}
