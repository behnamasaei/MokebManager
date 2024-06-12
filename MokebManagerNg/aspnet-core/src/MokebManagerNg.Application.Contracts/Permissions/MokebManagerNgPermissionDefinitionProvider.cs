using MokebManagerNg.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MokebManagerNg.Permissions;

public class MokebManagerNgPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(MokebManagerNgPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(MokebManagerNgPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<MokebManagerNgResource>(name);
    }
}
