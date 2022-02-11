import { BACKEND_ACCOUNT_API_URL, BACKEND_QUESTION_API_URL, BACKEND_GAME_API_URL, HTTP_BACKEND_ACCOUNT_API_URL, HTTP_BACKEND_GAME_API_URL, HTTP_BACKEND_QUESTION_API_URL } from '@env'
import { Platform } from 'react-native'
// Reason for this file is because babel caches react-native-dotenv environmental variables
// Just add some lines here to trigger update on variable until solution is fixed

// LAN HTTPS with self-signed certificates is hard to test with mobile, disable for development
export const ACCOUNT_SERVICE_API_URL = __DEV__ && Platform.OS != "web" ? HTTP_BACKEND_ACCOUNT_API_URL : BACKEND_ACCOUNT_API_URL
export const QUESTION_SERVICE_API_URL = __DEV__ && Platform.OS != "web" ? HTTP_BACKEND_QUESTION_API_URL : BACKEND_QUESTION_API_URL
export const GAME_SERVICE_API_URL = __DEV__ && Platform.OS != "web" ? HTTP_BACKEND_GAME_API_URL : BACKEND_GAME_API_URL