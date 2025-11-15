import { colors } from '@/styles/variables';
import { recipe } from '@vanilla-extract/recipes';

export const H1Style = recipe({
  base: {
    margin: 0,
    paddingBottom: 20,

    fontSize: 50,
    textAlign: 'center',
  },
});

export const ContainerStyle = recipe({
  base: {
    maxWidth: 600,
    padding: 20,

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,

    backgroundColor: colors.darkGrayHover,
    border: `2px solid ${colors.blue}`,
  },
});

export const ParagraphStyle = recipe({
  base: {
    margin: 0,
    paddingBottom: 20,

    textAlign: 'center',
    fontSize: 28,
  },
});

export const InnerContrainerStyle = recipe({
  base: {
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
});

export const ButtonStyle = recipe({
  base: {
    position: 'relative',
    minHeight: 55,
    flex: '1 1 auto',
    padding: '5px 20px',

    backgroundColor: colors.darkGray,
    border: `2px solid ${colors.blue}`,
  },

  variants: {
    trainButton: {
      true: {
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
      },
    },

    disabled: {
      true: {
        ':disabled': {
          backgroundColor: colors.darkGray,
        },
      },
      false: {
        cursor: 'pointer',

        ':hover': {
          backgroundColor: colors.lightGray,
        },
      },
    },
  },
});

export const SvgContainerStyle = recipe({
  base: {
    position: 'relative',
    bottom: -9.5,
    left: -1,
  },
});

export const TextInputStyle = recipe({
  base: {
    width: 80,
    height: 55,
    boxSizing: 'border-box',

    textAlign: 'center',
    backgroundColor: colors.darkGray,
    border: `2px solid ${colors.blue}`,

    ':hover': {
      backgroundColor: colors.lightGray,
    },

    ':disabled': {
      backgroundColor: colors.darkGray,
    },
  },
});

export const BottomContainerStyle = recipe({
  base: {
    width: '100%',
    height: 90,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.darkGray,
    border: `2px solid ${colors.blue}`,
  },
});
