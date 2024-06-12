using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace MokebManagerNg;

[Dependency(ReplaceServices = true)]
public class MokebManagerNgBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "MokebManagerNg";
}
