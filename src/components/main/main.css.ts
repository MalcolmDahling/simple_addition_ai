import { recipe } from '@vanilla-extract/recipes';

export const MainStyle = recipe({
  base: {
    minHeight: '100vh',
    padding: 20,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
