let places = ['Argentina','Canada','Florianópolis', 'Rio', 'Salvador',''];

let img = [
  'https://www.melhoresdestinos.com.br/wp-content/uploads/2021/10/buenos-aires-argentina-capa-820x430.jpg',
  'https://cdn.getyourguide.com/img/country/58de136b73284.jpeg/88.jpg',
  'https://todepassagem.clickbus.com.br/wp-content/uploads/2020/09/Praias-de-Florian%C3%B3polis.jpg',
  'https://www.costacruzeiros.com/content/dam/costa/costa-magazine/article-images/what-to-see-in-rio-de-janeiro/rio-de-janeiro-panorama_YuJas-Shutterstock_2.jpg.image.694.390.low.jpg',
  'https://vemvoar.voeazul.com.br/wp-content/uploads/2018/10/conheca-salvador-e-se-apaixone-pela-capital-baiana.jpeg'
]

export const mock = () =>
    [1, 2, 3, 4, 5].map((p,index) => {
      return {
        location: places[index],
        picture: img[index] ,
        available_location: 100 * Number(Math.random().toFixed(1)),
        id:`${index}`
      };
});