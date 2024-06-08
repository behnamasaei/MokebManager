using MokebManager.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MokebManager.Permissions;

public class MokebManagerPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(MokebManagerPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(MokebManagerPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<MokebManagerResource>(name);
    }
}
