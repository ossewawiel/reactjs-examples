'use client';

import PropTypes from 'prop-types';

// third-party
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project-import
import Locales from '../components/ui/component/Locales';
import NavigationScroll from '../layout/NavigationScroll';
import RTLLayout from '../components/ui/component/RTLLayout';
import Snackbar from '../components/ui/component/Snackbar';
import Notistack from '../components/ui/component/Notistack';

import ThemeCustomization from '../themes';

import { persister, store } from 'src/store';
import { ConfigProvider } from 'src/contexts/ConfigContext';

import { JWTProvider as AuthProvider } from 'src/contexts/jwt-context';
import { ModalProvider } from 'src/contexts/ModalContext';
import { OptimusLocalProvider } from 'src/contexts/OptimusLocalContext';

export default function ProviderWrapper({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <ModalProvider>
                  <NavigationScroll>
                    <AuthProvider>
                      <OptimusLocalProvider>
                        <Notistack>
                          <Snackbar />
                          {children}
                        </Notistack>
                      </OptimusLocalProvider>
                    </AuthProvider>
                  </NavigationScroll>
                </ModalProvider>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

ProviderWrapper.propTypes = {
  children: PropTypes.node,
};
