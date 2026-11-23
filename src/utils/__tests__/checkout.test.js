import { describe, expect, it } from 'vitest';

import { initialCheckoutValues, validateCheckout } from '../checkout';

const cartLines = [
  {
    medicine: {
      id: 'aspirin',
      name: 'Aspirin',
      price: 5.5,
    },
    quantity: 1,
  },
];

const validCheckoutValues = {
  fullName: 'Taylor Patient',
  email: 'taylor@example.com',
  phone: '555-0100',
};

describe('validateCheckout', () => {
  it('requires at least one cart line before checkout fields are accepted', () => {
    expect(validateCheckout(validCheckoutValues, [])).toBe(
      'Add at least one medicine before checking out.',
    );
  });

  it('requires a patient name', () => {
    expect(validateCheckout(
      {
        ...validCheckoutValues,
        fullName: '   ',
      },
      cartLines,
    )).toBe('Enter the patient name.');
  });

  it('requires a contact email', () => {
    expect(validateCheckout(
      {
        ...validCheckoutValues,
        email: '',
      },
      cartLines,
    )).toBe('Enter a contact email.');
  });

  it('requires a contact phone number', () => {
    expect(validateCheckout(
      {
        ...validCheckoutValues,
        phone: '  ',
      },
      cartLines,
    )).toBe('Enter a contact phone number.');
  });

  it('accepts complete checkout details when the cart has a medicine', () => {
    expect(validateCheckout(validCheckoutValues, cartLines)).toBe('');
  });
});

describe('initialCheckoutValues', () => {
  it('starts every required checkout field empty', () => {
    expect(initialCheckoutValues).toEqual({
      fullName: '',
      email: '',
      phone: '',
    });
  });
});
