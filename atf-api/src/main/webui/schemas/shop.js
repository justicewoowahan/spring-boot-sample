import Woowahan from 'woowahan';

export const GetShopSchema = Woowahan.Schema.create('GetAddressJusoSchema', {
  shopId: Woowahan.Types.String({ required: true })
});

export const GetShopListSchema = Woowahan.Schema.create('GetShopListSchema', {});



