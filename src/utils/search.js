export function filterMedicines(medicines, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return medicines;
  }

  return medicines.filter((medicine) => (
    medicine.name.toLowerCase().includes(normalizedQuery)
  ));
}
