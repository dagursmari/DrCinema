export const normalizeInitial = (ch: string): string => {
  const upper = ch.toUpperCase();

  switch (upper) {
    // A group
    case "Á":
    case "À":
    case "Â":
    case "Ä":
    case "Ã":
    case "Å":
    case "Æ":
      return "A";

    // E group
    case "É":
    case "È":
    case "Ê":
    case "Ë":
      return "E";

    // I group
    case "Í":
    case "Ì":
    case "Î":
    case "Ï":
      return "I";

    // O group
    case "Ó":
    case "Ò":
    case "Ô":
    case "Ö":
    case "Õ":
    case "Ø":
      return "O";

    // U group
    case "Ú":
    case "Ù":
    case "Û":
    case "Ü":
      return "U";

    // Y group
    case "Ý":
      return "Y";

    // Iceland-specific letters
    case "Ð":
      return "D";

    default:
      return upper;
  }
};