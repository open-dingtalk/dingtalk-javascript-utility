import env from './dingtalk-env';

export const { framework, runtime, isDingtalk, isWebiOS, isWebAndroid, isWeexiOS, isWeexAndroid } = env;
export const isWeex = isWeexAndroid || isWeexiOS;
