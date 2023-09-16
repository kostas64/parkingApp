import {Dimensions, Platform} from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const HEIGHT = Dimensions.get('screen').height;
export const WIDTH = Dimensions.get('screen').width;
