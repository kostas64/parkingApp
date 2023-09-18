export const isCardNumberValid = (
  cardNumber,
  cardType,
  setCardType,
  set = true,
) => {
  let isValid = false;
  const compareString = cardNumber
    ?.replace(' ', '')
    ?.replace(' ', '')
    ?.replace(' ', '');

  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const amexpRegEx = /^(?:3[47][0-9]{13})$/;
  const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

  if (visaRegEx.test(compareString)) {
    isValid = true;
    set && cardType !== 'visa' && setCardType('visa');
  } else if (mastercardRegEx.test(compareString)) {
    isValid = true;
    set && cardType !== 'mastercard' && setCardType('mastercard');
  } else if (amexpRegEx.test(compareString)) {
    isValid = true;
    set && cardType !== 'amex' && setCardType('amex');
  } else if (discovRegEx.test(compareString)) {
    isValid = true;
    cardType !== 'discover' && setCardType('discover');
  } else {
    set && !!cardType && setCardType(null);
  }

  return isValid;
};

export const getCardType = (cardNumber, setCardType) => {
  if (cardNumber.length >= 1 && cardNumber.startsWith('4')) {
    setCardType('visa');
  } else if (
    (cardNumber.length >= 2 && cardNumber.startsWith('65')) ||
    (cardNumber.length >= 3 &&
      cardNumber.substring(0, 3) >= '644' &&
      cardNumber.length >= 3 &&
      cardNumber.substring(0, 3) <= '649') ||
    (cardNumber.length >= 4 && cardNumber.startsWith('6011'))
  ) {
    setCardType('discover');
  } else if (
    (cardNumber.length >= 2 &&
      cardNumber.substring(0, 2) >= '51' &&
      cardNumber.length >= 2 &&
      cardNumber.substring(0, 2) <= '55') ||
    (cardNumber.length >= 4 &&
      cardNumber.substring(0, 4) >= '2221' &&
      cardNumber.length >= 4 &&
      cardNumber.substring(0, 4) <= '2720')
  ) {
    setCardType('mastercard');
  } else if (
    (cardNumber.length >= 2 && cardNumber.startsWith('34')) ||
    (cardNumber.length >= 2 && cardNumber.startsWith('37'))
  ) {
    setCardType('amex');
  } else {
    setCardType(null);
  }
};

export const isExpValid = value => {
  return (
    value.length === 5 &&
    value.substring(0, 2) > '00' &&
    value.substring(0, 2) <= '12' &&
    (value.substring(3, 5) >
      new Date().getFullYear().toString().substring(2, 4) ||
      (value.substring(3, 5) ===
        new Date().getFullYear().toString().substring(2, 4) &&
        value.substring(0, 2) >= new Date().getMonth() + 1))
  );
};

export const doesCardExist = (credits, cardNumber, expDate, ccv) =>
  credits?.some(
    credit =>
      credit.cardNumber === cardNumber &&
      credit.expDate === expDate &&
      credit.ccv === ccv,
  );
