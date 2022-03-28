//types
import { AllDatabaseType } from 'types';

//constants
import { CHANNEL, USER } from 'Constants';

export function getLoggedUserInfo(
  loggedUserId: string,
  selectedId: string,
  type: string,
  data: AllDatabaseType | null
) {
  const { allChannels, allUsers, allDirectMessages } = data ?? {};

  let displayName, messageStream, members;
  if (type === CHANNEL) {
    displayName = allChannels?.[selectedId]?.channelName;
    messageStream = allChannels?.[selectedId]?.messageStream;
    members = allChannels?.[selectedId]?.members;
  }

  if (type === USER) {
    displayName = allUsers?.[selectedId]?.firstName + ' ' + allUsers?.[selectedId]?.lastName;
    messageStream =
      allDirectMessages?.[`${loggedUserId}-to-${selectedId}`]?.messages ??
      allDirectMessages?.[`${selectedId}-to-${loggedUserId}`]?.messages;
    members = [];
  }

  return {
    displayName,
    messageStream,
    members,
  };
}

export function toLocalTime(time: Date) {
  const localTime = new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });

  return localTime.toUpperCase();
}
