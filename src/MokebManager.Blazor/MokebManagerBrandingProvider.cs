using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace MokebManager.Blazor;

[Dependency(ReplaceServices = true)]
public class MokebManagerBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "MokebManager";
}
