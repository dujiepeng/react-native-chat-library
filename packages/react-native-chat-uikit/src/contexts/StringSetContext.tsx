import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { HeaderContextType } from '../types';
import defaultHeaderHeight from '../utils/defaultHeaderHeight';

export const HeaderContext = React.createContext<HeaderContextType>({
  defaultHeight: defaultHeaderHeight(false),
  defaultStatusBarTranslucent: true,
  defaultTitleAlign: 'left',
  defaultTopInset: StatusBar.currentHeight ?? 0,
});
HeaderContext.displayName = 'HeaderContext';

type HeaderProps = React.PropsWithChildren<
  Pick<HeaderContextType, 'defaultStatusBarTranslucent' | 'defaultTitleAlign'>
>;

export const HeaderStyleProvider = ({
  children,
  defaultTitleAlign: titleAlign,
  defaultStatusBarTranslucent: statusBarTranslucent,
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <HeaderContext.Provider
      value={{
        defaultTitleAlign: titleAlign,
        defaultStatusBarTranslucent: statusBarTranslucent,
        defaultTopInset: statusBarTranslucent ? top : 0,
        defaultHeight: defaultHeaderHeight(width > height),
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export function useHeaderContext(): HeaderContextType {
  const header = React.useContext(HeaderContext);
  if (!header) throw Error('HeaderContext is not provided');
  return header;
}
