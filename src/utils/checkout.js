export const initialCheckoutValues = {
  fullName: '',
  email: '',
  phone: '',
};

export function validateCheckout(values, cartLines) {
  if (cartLines.length === 0) {
    return 'Add at least one medicine before checking out.';
  }

  if (values.fullName.trim() === '') {
    return 'Enter the patient name.';
  }

  if (values.email.trim() === '') {
    return 'Enter a contact email.';
  }

  if (values.phone.trim() === '') {
    return 'Enter a contact phone number.';
  }

  return '';
}
