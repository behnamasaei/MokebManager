using System;
using System.Collections.Generic;
using System.Text;
using MokebManagerNg.Localization;
using Volo.Abp.Application.Services;

namespace MokebManagerNg;

/* Inherit your application services from this class.
 */
public abstract class MokebManagerNgAppService : ApplicationService
{
    protected MokebManagerNgAppService()
    {
        LocalizationResource = typeof(MokebManagerNgResource);
    }
}
