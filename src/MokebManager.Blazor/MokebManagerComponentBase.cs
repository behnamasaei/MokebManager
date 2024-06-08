using MokebManager.Localization;
using Volo.Abp.AspNetCore.Components;

namespace MokebManager.Blazor;

public abstract class MokebManagerComponentBase : AbpComponentBase
{
    protected MokebManagerComponentBase()
    {
        LocalizationResource = typeof(MokebManagerResource);
    }
}
