export function addMedicineToCart(cartLines, medicine) {
  const existingLine = cartLines.find((line) => line.medicine.id === medicine.id);

  if (existingLine) {
    return cartLines.map((line) => {
      if (line.medicine.id !== medicine.id) {
        return line;
      }

      return {
        ...line,
        quantity: line.quantity + 1,
      };
    });
  }

  return [
    ...cartLines,
    {
      medicine,
      quantity: 1,
    },
  ];
}

export function calculateCartTotals(cartLines) {
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce(
    (total, line) => total + (line.medicine.price * line.quantity),
    0,
  );

  return {
    itemCount,
    subtotal,
  };
}
