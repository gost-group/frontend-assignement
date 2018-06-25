import React from 'react';
import { isEmpty, isNil } from 'ramda';
import { branch, compose, renderNothing } from 'recompose';

import LoaderMessageWrp from './styled/LoaderMessageWrp';

const checkIsEmpty = ({ message }) => isNil(message) || isEmpty(message);

const enhance = compose(branch(checkIsEmpty, renderNothing));

const LoaderMessage = ({ color, message }) => <LoaderMessageWrp {...{ color }}>{message}</LoaderMessageWrp>;

export default enhance(LoaderMessage);
