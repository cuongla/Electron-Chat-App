import moment from 'moment';
import { Timestamp } from '../db/firestore';

export const createTimestamp = () =>
  Timestamp.now().toMillis().toString();


export const formatTimeAgo = timestamp =>
  moment(parseInt(timestamp, 10)).fromNow();