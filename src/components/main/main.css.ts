import { recipe } from '@vanilla-extract/recipes';

export const MainStyle = recipe({
  base: {
    position: 'absolute',
    inset: 20,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
