import { Chat_Skeleton } from './Chat_Skeleton';

export const Chatting_Skeleton = () => {
    return (
        <div className="flex flex-col h-[537px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-2 gap-2">
          <Chat_Skeleton width={200} />
          <Chat_Skeleton width={400} />
          <Chat_Skeleton width={300} />
          <Chat_Skeleton width={200} />
          <Chat_Skeleton width={400} />
          <Chat_Skeleton width={300} />
        </div>
      </div>
    )
}