import React from 'react';
import { withBaseLayout } from '../layouts/Base';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../actions/chats';
import { useHistory } from 'react-router-dom';

function ChatCreate() {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    dispatch(createChat(data, user.uid))
      .then(_ => history.push('/home'))
  )
}

export default withBaseLayout(ChatCreate, { canGoBack: true });