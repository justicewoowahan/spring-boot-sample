import Woowahan from 'woowahan';

export const GetAddressJusoSchema = Woowahan.Schema.create('GetAddressJusoSchema', {
  search: Woowahan.Types.String({ required: true }),
  page: Woowahan.Types.Number()
});

export const GetAddressSidoSchema = Woowahan.Schema.create('GetAddressSidoSchema', {

});

export const GetAddressSidoSigunguSchema = Woowahan.Schema.create('GetAddressSidoSigunguSchema', {
  sidoCode: Woowahan.Types.Number({ required: true })
});

export const GetAddressSidoSigunguJusoSchema = Woowahan.Schema.create('GetAddressSidoSigunguJusoSchema', {
  sidoCode: Woowahan.Types.Number({ required: true }),
  sigunguCode: Woowahan.Types.Number({ required: true }),
  search: Woowahan.Types.String({ required: true }),
  page: Woowahan.Types.Number()
});

export const PostAddressSelectSchema = Woowahan.Schema.create('PostAddressSelectSchema', {

});