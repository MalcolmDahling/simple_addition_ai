import { fontFace, globalStyle } from '@vanilla-extract/css';
import { colors } from './variables';

export const VisitorFont = fontFace({
  src: 'url("/fonts/visitor2.ttf")',
});

globalStyle('html, body', {
  margin: 0,
  backgroundColor: colors.darkGray,
});

globalStyle('*', {
  fontFamily: VisitorFont,
  fontSize: 36,

  WebkitTextStroke: 6,
  WebkitTextStrokeColor: colors.black,
  paintOrder: 'stroke fill',
  color: colors.white,
});
