export const Colors = {

  hexToRgba(hex, opacity) {
    hex = hex.replace('#','');
    const r = parseInt(hex.substring(0,2), 16),
          g = parseInt(hex.substring(2,4), 16),
          b = parseInt(hex.substring(4,6), 16);
    return `rgba(${r} ,${g}, ${b}, ${opacity})`;
  },
};
