using MokebManagerNg.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MokebManagerNg.Permissions;

public class MokebManagerNgPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        // var myGroup = context.AddGroup(MokebManagerNgPermissions.GroupName, L("Permission:Permission"));

        // //Define your own permissions here. Example:
        // myGroup.AddPermission(MokebManagerNgPermissions.Reporting, L("Permission:Reporting"));
        // myGroup.AddPermission(MokebManagerNgPermissions.Reservation, L("Permission:Reservation"));
        // myGroup.AddPermission(MokebManagerNgPermissions.ClockEntryExit, L("Permission:ClockEntryExit"));

        // var mokebMangement = myGroup.AddPermission(MokebManagerNgPermissions.Mokeb, L("Permission:Mokeb"));
        // mokebMangement.AddChild(MokebManagerNgPermissions.MokebCreate, L("Permission:MokebCreate"));
        // mokebMangement.AddChild(MokebManagerNgPermissions.MokebUpdate, L("Permission:MokebUpdate"));
        // mokebMangement.AddChild(MokebManagerNgPermissions.MokebRead, L("Permission:MokebRead"));
        // mokebMangement.AddChild(MokebManagerNgPermissions.MokebDelete, L("Permission:MokebDelete"));

        // var zaerManagement = myGroup.AddPermission(MokebManagerNgPermissions.Zaer, L("Permission:Zaer"));
        // zaerManagement.AddChild(MokebManagerNgPermissions.ZaerCreate, L("Permission:ZaerCreate"));
        // zaerManagement.AddChild(MokebManagerNgPermissions.ZaerUpdate, L("Permission:ZaerUpdate"));
        // zaerManagement.AddChild(MokebManagerNgPermissions.ZaerRead, L("Permission:ZaerRead"));
        // zaerManagement.AddChild(MokebManagerNgPermissions.ZaerDelete, L("Permission:ZaerDelete"));

    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<MokebManagerNgResource>(name);
    }
}
