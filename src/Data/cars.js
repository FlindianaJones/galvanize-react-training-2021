export const getCars = async () => {
  return await (await fetch('http://localhost:5000/api/vehicles')).json();
  // return [
  //     { make: 'Toyoda', model: 'Five Runner', year: 2002 },
  //     { make: 'Rhonda', model: 'Civil', year: 1989 },
  //     { make: 'Afford', model: 'S Court', year: 2010 },
  //     { make: 'Heavy', model: 'Hevvelle', year: 1993 },
  //     { make: 'Avoid', model: 'Pram', year: 2020 },
  // ]
};
