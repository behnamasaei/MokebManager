using System;
using Volo.Abp;

namespace MokebManagerNg;

public class MokebManagerException : AbpException
{
    public MokebManagerException(string message) : base(message)
    {
    }
}