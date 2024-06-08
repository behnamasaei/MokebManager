using System;
using System.Collections.Generic;
using System.Text;
using MokebManager.Localization;
using Volo.Abp.Application.Services;

namespace MokebManager;

/* Inherit your application services from this class.
 */
public abstract class MokebManagerAppService : ApplicationService
{
    protected MokebManagerAppService()
    {
        LocalizationResource = typeof(MokebManagerResource);
    }
}
