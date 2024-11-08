import { AppRegistry } from 'react-native';
import AppWrapper from './src/app-wrapper'; // Chú ý tên file phải đúng
import appConfig from './app.json'; // Import toàn bộ app.json

const appName = appConfig.expo.name; // Lấy giá trị `name` từ `expo` trong `app.json`

AppRegistry.registerComponent(appName, () => AppWrapper);
