import { extendTheme } from 'native-base';

const theme = extendTheme({
    colors: {
      // Add new color
      white_bd: {
        50: '#ffffff',
        100: '#ffffff',
        200: '#ffffff',
        300: '#ffffff',
        400: '#ffffff',
        500: '#ffffff',
        600: '#ffffff',
        700: '#B8B8B8',
        800: '#9C9C9C',
        900: '#929292',
      },
      blue_button_bd: {
        500: '#061C53',
        600: '#002B96',
        700: '#002B96',
        800: '#002B96',
        900: '#002B96',
      },
      
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
    components: {
      ModalBody: {
        baseStyle: {
          _text: {
            color: '#961919'
          }
        }
      }
    }
  });

  export {theme}