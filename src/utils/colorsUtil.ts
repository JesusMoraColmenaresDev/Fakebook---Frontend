export function generateColorFromText(text: string): string {
  // Si el texto está vacío, devolvemos un color gris por defecto.
  if (!text || text.length === 0) {
    return 'hsl(0, 0%, 50%)'; // Gris en HSL
  }

  // 1. Convertir el texto a un array de caracteres.
  const chars = Array.from(text);

  // 2. Seleccionar un carácter aleatorio.
  const randomIndex = Math.floor(Math.random() * chars.length);
  const randomChar = chars[randomIndex];

  // 3. Obtener el valor numérico (código ASCII/Unicode) del carácter.
  const charCode = randomChar.charCodeAt(0);

  // 4. Mapear el código del carácter a un valor de matiz (HUE) entre 0 y 360.
  //    Usamos el operador módulo (%) para asegurarnos de que el valor esté en el rango correcto.
  const hue = (charCode % 81) + 190;

  // 5. Definimos valores fijos de saturación y luminosidad para obtener colores vivos y visibles.
  //    Puedes experimentar con estos valores.
  const saturation = 80; // Porcentaje (0-100)
  const lightness = 30;  // Porcentaje (0-100)

  // 6. Devolvemos el color en el formato HSL que CSS entiende directamente.
  //    ¡No se necesita ninguna conversión a RGB!
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
