using AutoMapper;
using MokebManagerNg.Domain.CreateUpdateDtos;
using MokebManagerNg.Domain.Dtos;

namespace MokebManagerNg;

public class MokebManagerNgApplicationAutoMapperProfile : Profile
{
    public MokebManagerNgApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Mokeb, MokebDto>();
        CreateMap<Mokeb, CreateUpdateMokebDto>();

        CreateMap<Zaer, ZaerDto>();
        CreateMap<Zaer, CreateUpdateZaerDto>();

        CreateMap<EntryExitZaer, EntryExitZaerDto>();
        CreateMap<EntryExitZaer, CreateUpdateEntryExitZaerDto>();

    }
}
