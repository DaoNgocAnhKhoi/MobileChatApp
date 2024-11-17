// src/react-native-paper.d.ts
import 'react-native-paper';

declare module 'react-native-paper' {
  interface MD3Colors {
    text: string;
    button: {
      color: string;
      bgcolor: string;
      hvbgcolor: string;
      hvcolor?: string;
    };
  }
}
