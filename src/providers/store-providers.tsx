'use client';

import { Provider } from 'react-redux';

import { store } from '../api/store';

export default function StoreProviders({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <Provider store={store}>{children}</Provider>;
}
