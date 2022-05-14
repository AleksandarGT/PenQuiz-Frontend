import { createNavigationContainerRef } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()


export function removeBackStack(topNode: string, params?: any) {
  if(navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        {
          name: topNode,
          params: params
        }
      ]
    }))
  }
}