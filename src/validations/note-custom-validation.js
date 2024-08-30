export const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing)
    return event.target.setCustomValidity('Judul Wajib diisi.');

  if (event.target.validity.tooShort)
    return event.target.setCustomValidity(
      'Minimal panjang judul adalah enam karakter.',
    );

  if (event.target.validity.patternMismatch) {
    return event.target.setCustomValidity(
      'Judul idak boleh diawali dengan simbol,\
        mengandung white space atau spasi, dan\
        mengandung karakter spesial seperti dolar ($).',
    );
  }
};

export const customValidationBodyHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing)
    return event.target.setCustomValidity('Isi Catatan Wajib diisi.');

  if (event.target.validity.tooShort)
    return event.target.setCustomValidity(
      'Minimal panjang isi adalah enam karakter.',
    );
};
