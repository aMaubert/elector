

export enum Level {
  ZERO_TO_TWO = 2,
  TWO_TO_FOUR = 4,
  FOUR_TO_SIX = 6,
  SIX_TO_EIGHT = 8,
  EIGHT_TO_TEN = 10,
  TEN_TO_TWELVE = 12,
  TWELVE_TO_FOURTEEN = 14,
  FOURTEEN_TO_SIXTEEN = 16,
  SIXTEEN_TO_EIGHTEEN = 18,
  EIGHTEEN_TO_TWENTY = 20
  // ZERO_TO_TWO = 'ZERO_TO_TWO',
  // TWO_TO_FOUR = 'TWO_TO_FOUR',
  // FOUR_TO_SIX = 'FOUR_TO_SIX',
  // SIX_TO_EIGHT = 'SIX_TO_EIGHT',
  // EIGHT_TO_TEN = 'EIGHT_TO_TEN',
  // TEN_TO_TWELVE = 'TEN_TO_TWELVE',
  // TWELVE_TO_FOURTEEN = 'TWELVE_TO_FOURTEEN',
  // FOURTEEN_TO_SIXTEEN = 'FOURTEEN_TO_SIXTEEN',
  // SIXTEEN_TO_EIGHTEEN = 'SIXTEEN_TO_EIGHTEEN',
  // EIGHTEEN_TO_TWENTY = 'EIGHTEEN_TO_TWENTY'
}

export const medianNoteToLevel = (medianNote: number): Level => {
  if (0 < medianNote && medianNote <= 2) {
    return Level.ZERO_TO_TWO;
  } else if (2 < medianNote && medianNote <= 4) {
    return Level.TWO_TO_FOUR;
  } else if (4 < medianNote && medianNote <= 6) {
    return Level.FOUR_TO_SIX;
  } else if (6 < medianNote && medianNote <= 8) {
    return Level.SIX_TO_EIGHT;
  } else if (8 < medianNote && medianNote <= 10) {
    return Level.EIGHT_TO_TEN;
  } else if (10 < medianNote && medianNote <= 12) {
    return Level.TEN_TO_TWELVE;
  } else if (12 < medianNote && medianNote <= 14) {
    return Level.TWELVE_TO_FOURTEEN;
  } else if (14 < medianNote && medianNote <= 16) {
    return Level.FOURTEEN_TO_SIXTEEN;
  } else if (16 < medianNote && medianNote <= 18) {
    return Level.SIXTEEN_TO_EIGHTEEN;
  } else if (16 < medianNote && medianNote <= 18) {
    return Level.EIGHTEEN_TO_TWENTY;
  }
  throw new Error(`MedianNote should be between 0 and 20, but got : ${medianNote} `);
};
