/**
 * Convierte una marca de tiempo (timestamp) a una cadena de fecha y hora legible.
 * @param {number} timestamp - Marca de tiempo que se va a convertir.
 * @returns {string} Cadena de fecha y hora en el formato 'DD-MM-YYYY HH:mm:ss'.
 */
export const convertTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}hs`;
}