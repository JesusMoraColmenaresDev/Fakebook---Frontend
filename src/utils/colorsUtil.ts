export function generateColorFromText(text: string): string {
  // Si el texto está vacío, devolvemos un color gris por defecto.
  if (!text || text.length === 0) {
    return 'rgb(128,128,128)';
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
  const hue = charCode % 361;

  // 5. Definimos valores fijos de saturación y luminosidad para obtener colores vivos y visibles.
  //    Puedes experimentar con estos valores.
  const saturation = 70; // Porcentaje (0-100)
  const lightness = 30;  // Porcentaje (0-100)

  // 6. Convertimos el color HSL a RGB usando una función auxiliar.
  const [r, g, b] = hslToRgb(hue, saturation, lightness);

  // 7. Devolvemos el color en el formato que necesita CSS.
  //    Lo devolvemos sin espacios para que sea compatible con los valores arbitrarios de Tailwind.
  return `rgb(${r},${g},${b})`;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  // Normalizamos los valores de saturación y luminosidad a un rango de 0 a 1.
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255) - Math.floor(Math.random() * 100);
  g = Math.round((g + m) * 255)- Math.floor(Math.random() * 100); ;
  b = Math.round((b + m) * 255) +  Math.floor(Math.random() * 250);

  return [r, g, b];
}