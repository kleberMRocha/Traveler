let places = ['Argentina','Canada','Florianópolis', 'Rio', 'Salvador',''];

let img = [
  'https://www.descubraturismo.com.br/wp-content/uploads/2018/08/viagem-para-a-argentina-capa-1-1920x520.jpg',
  'https://cdn.getyourguide.com/img/country/58de136b73284.jpeg/88.jpg',
  'https://todepassagem.clickbus.com.br/wp-content/uploads/2020/09/Praias-de-Florian%C3%B3polis.jpg',
  'https://a.cdn-hotels.com/gdcs/production18/d198/12320050-c55c-11e8-87bb-0242ac11000d.jpg',
  'https://vemvoar.voeazul.com.br/wp-content/uploads/2018/10/conheca-salvador-e-se-apaixone-pela-capital-baiana.jpeg'
]

export const mock = () =>
    [1, 2, 3, 4, 5].map((p,index) => {
      return {
        location: places[index],
        picture: img[index] ,
        available_location: index ? index  * 2 : 3,
        id:`${index}`
      };
});