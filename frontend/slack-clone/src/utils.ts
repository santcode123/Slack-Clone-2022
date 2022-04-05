//types
import { MessageStreamType } from 'types';
//constants
import { SIGN_UP, LOGIN, EMPTY_OBJECT, PENDING } from 'Constants';

export function getChatInfo(
  status: string,
  data?: { selectedId: string; displayName: string; messageStream: Array<MessageStreamType>; members: Array<string> }
) {
  return data;
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

export function getErrorMessage(
  userInfo: { userName?: string; password?: string; firstName?: string },
  type: string
): string | null {
  const { userName, password, firstName } = userInfo;

  function getLoginErrorMessage(userName?: string, password?: string) {
    let errorMessage = null;
    if (!userName && !password) {
      errorMessage = 'UserName and Password are required';
    } else if (!userName) {
      errorMessage = 'UserName is required';
    } else if (!password) {
      errorMessage = 'Password is required';
    }
    return errorMessage;
  }
  function getSignUpErrorMessage(userName?: string, password?: string, firstName?: string) {
    let errorMessage = null;
    if (!userName && !password && !firstName) {
      errorMessage = 'UserName,Password and FirstName are required';
    } else if (firstName) {
      errorMessage = getLoginErrorMessage(userName, password);
    } else if (!firstName && !userName) {
      errorMessage = 'FirstName and UserName is required';
    } else if (!firstName && !password) {
      errorMessage = 'FirstName and Password is required';
    } else if (!firstName) {
      errorMessage = 'FirstName is required';
    }
    return errorMessage;
  }
  if (type === SIGN_UP) return getSignUpErrorMessage(userName, password, firstName);
  if (type === LOGIN) return getLoginErrorMessage(userName, password);
  return null;
}
