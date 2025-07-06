const fareMatrix = require('./farematrix');

function calculateFare(distanceKm, isDiscounted) {
  let fareBracket = fareMatrix.find(bracket => distanceKm <= bracket.maxDistance);

  if (!fareBracket) {
    // If distance exceeds maximum in matrix
    return {
      regularFare: null,
      discountFare: null,
      message: "Distance exceeds supported fare matrix."
    };
  }

  return {
    regularFare: fareBracket.regularFare,
    discountFare: fareBracket.discountFare,
    fareToCharge: isDiscounted 
      ? fareBracket.discountFare
      : fareBracket.regularFare
  };
}

module.exports = { calculateFare };