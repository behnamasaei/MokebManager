using MokebManager.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace MokebManager.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class MokebManagerController : AbpControllerBase
{
    protected MokebManagerController()
    {
        LocalizationResource = typeof(MokebManagerResource);
    }
}
