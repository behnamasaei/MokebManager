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

        CreateMap<Mokeb, MokebDto>().ReverseMap();
        CreateMap<Mokeb, CreateUpdateMokebDto>().ReverseMap();

        CreateMap<Zaer, ZaerDto>().ReverseMap();
        CreateMap<Zaer, CreateUpdateZaerDto>().ReverseMap();
        CreateMap<Zaer, CreateZaerDto>().ReverseMap();
        CreateMap<Zaer, UpdateZaerDto>().ReverseMap();



        CreateMap<EntryExitZaer, EntryExitZaerDto>().ReverseMap();
        CreateMap<EntryExitZaer, CreateUpdateEntryExitZaerDto>().ReverseMap();

    }
}
