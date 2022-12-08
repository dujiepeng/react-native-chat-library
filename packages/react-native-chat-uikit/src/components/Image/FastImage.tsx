import * as React from 'react';
import type {
  FastImageProps,
  ResizeMode,
  Source,
} from 'react-native-fast-image';

import type { ImageComponent, ImageProps } from './index';

const convertCache = (
  cache?: 'default' | 'reload' | 'force-cache' | 'only-if-cached' | undefined
): 'immutable' | 'web' | 'cacheOnly' => {
  switch (cache) {
    case 'force-cache':
    case 'only-if-cached':
      return 'cacheOnly';
    default:
      return 'immutable';
  }
};

const convertSource = (source: ImageProps['source']): Source | number => {
  if (Array.isArray(source)) {
    return convertSource(source[0]);
  }

  if (typeof source === 'number') {
    return source;
  }

  return {
    uri: source?.uri,
    headers: source?.headers,
    cache: convertCache(source?.cache), //'immutable' | 'web' | 'cacheOnly'
  };
};

const convertDefaultSource = (
  source: ImageProps['source']
): number | undefined => {
  if (source === undefined) {
    return source;
  }
  if (Array.isArray(source)) {
    return convertDefaultSource(source[0]);
  }

  if (typeof source === 'number') {
    return source;
  } else {
    throw new Error('The Source type is not supported.');
  }
};

const convertResizeMode = (
  mode?: ImageProps['resizeMode']
): ResizeMode | undefined => {
  switch (mode) {
    case 'center':
      return 'center';
    case 'contain':
      return 'contain';
    case 'cover':
      return 'cover';
    case 'stretch':
      return 'stretch';
    default:
      return undefined;
  }
};

type FastImageComponent = (props: FastImageProps) => JSX.Element | null;

const FastImageWrapper: ImageComponent = ({
  source,
  resizeMode,
  onLoad,
  onError,
  style,
  defaultSource,
  ...props
}) => {
  const FastImage = React.memo(
    require('react-native-fast-image') as FastImageComponent
  );

  return (
    <FastImage
      {...props}
      onLoad={onLoad && ((e) => onLoad(e.nativeEvent))}
      onError={
        onError &&
        (() =>
          onError({
            error: {
              source: '',
              description: `Image loading error occurred!`,
            },
          }))
      }
      style={style as FastImageProps['style']}
      source={convertSource(source)}
      defaultSource={convertDefaultSource(defaultSource)}
      resizeMode={convertResizeMode(resizeMode)}
    />
  );
};

export default FastImageWrapper;
