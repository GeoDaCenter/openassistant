/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ReactNode } from 'react';
import './Dialog.css';

import * as React from 'react';

type Props = Readonly<{
  'data-test-id'?: string;
  children: ReactNode;
}>;

export function DialogButtonsList({ children }: Props) {
  return <div className="DialogButtonsList">{children}</div>;
}

export function DialogActions({ 'data-test-id': dataTestId, children }: Props) {
  return (
    <div className="DialogActions" data-test-id={dataTestId}>
      {children}
    </div>
  );
}
