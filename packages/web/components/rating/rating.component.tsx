import React from 'react';
import { RatingStyles } from './rating.styles';
import { formatRating } from '../../utils/formatRating';

export function RatingComponent({ rating }: { rating: number }) {
  // Formater le score avec un maximum d'un chiffre après la virgule
  const formattedRating = formatRating(rating);

  return (
    <RatingStyles className="vote--container" rating={rating}>
      <div className="vote" />
      <div className="percent">{formattedRating}%</div>
    </RatingStyles>
  );
}
