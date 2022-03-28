import React from 'react';

//types
import { MessageStreamType } from 'types';

//utils
import { toLocalTime } from 'utils';

export const MessageBody = React.forwardRef(
  (
    { messageStream }: { messageStream: MessageStreamType[] },
    ref: React.ForwardedRef<HTMLDivElement | null>
  ): React.ReactElement => {
    return (
      <div className="message-body-container" ref={ref}>
        {messageStream.map((data, index) => {
          return (
            <div className="message-box" key={index}>
              <div>
                <img
                  src="https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67"
                  width={40}
                  height={40}
                  alt="userProfile"
                />
              </div>
              <div className="message-body">
                <div className="sender-profile">
                  <span>{data.sender}</span>
                  <span className="local-time">{toLocalTime(data.time)}</span>
                </div>
                <div className="message">{data.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
