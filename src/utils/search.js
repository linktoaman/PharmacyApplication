export function filterMedicines(medicines, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return medicines;
  }

  return medicines.filter((medicine) => {
    const searchableText = [
      medicine.name,
      medicine.category,
      medicine.description,
    ].join(' ').toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
