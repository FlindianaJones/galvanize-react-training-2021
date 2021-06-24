export const getCars = async () => {
  return await (await fetch('http://localhost:5000/api/vehicles')).json();
};
