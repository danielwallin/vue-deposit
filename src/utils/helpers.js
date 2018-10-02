export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLogo = (type, cardType) => {
  let logo = '';
  switch (cardType && cardType.toLowerCase() || type && type.toLowerCase()) {
      case 'neteller':
          logo = '<img style="width: 30px" src="data:image/png;base64,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"/>';
          break;
      case 'visa':
          logo = '<i class="fab fa-cc-visa"></i>';
          break;
      case 'mastercard':
          logo = '<i class="fab fa-cc-mastercard"></i>';
          break;
      case 'paypal':
          logo = '<i class="fab fa-cc-paypal"></i>';
          break;

      default:
          break;
  }

  return logo;
};
