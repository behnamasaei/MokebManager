using Volo.Abp.Settings;

namespace MokebManager.Settings;

public class MokebManagerSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(MokebManagerSettings.MySetting1));
    }
}
