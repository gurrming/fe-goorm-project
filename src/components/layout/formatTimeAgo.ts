export const formatTimeAgo = (createdAt: string) => {
    const NOW = new Date().getTime();
    const milliSeconds = NOW - new Date(createdAt).getTime();
    const seconds = milliSeconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const time =
      days > 1
        ? `${Math.floor(days)}일 전`
        : hours > 1
          ? `${Math.floor(hours)}시간 전`
          : minutes > 1
            ? `${Math.floor(minutes)}분 전`
            : `${Math.floor(seconds)}초 전`;

    return time;
};