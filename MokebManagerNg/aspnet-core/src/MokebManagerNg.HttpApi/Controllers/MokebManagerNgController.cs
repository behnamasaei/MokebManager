using MokebManagerNg.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace MokebManagerNg.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class MokebManagerNgController : AbpControllerBase
{
    protected MokebManagerNgController()
    {
        LocalizationResource = typeof(MokebManagerNgResource);
    }
}
