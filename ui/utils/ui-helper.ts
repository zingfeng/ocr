export function getRndColorTag(): string {
  const color = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
  ];

  return color[Math.floor(Math.random() * color.length)];
}

export function formatTime(time: number): string {
  if (time.toString().length === 10) {
    time = time * 1000;
  }

  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const minute = Math.floor(diff / (1000 * 60));
  if (day > 0) {
    return `${day} ngày trước`;
  } else if (hour > 0) {
    return `${hour} giờ trước`;
  } else if (minute > 0) {
    return `${minute} phút trước`;
  } else {
    return 'Vừa xong';
  }
}

export function formatView(view: number): string | number {
  if (view < 1000) {
    return view;
  }

  if (view < 1000000) {
    return `${Math.floor(view / 1000)}K`;
  }

  if (view < 1000000000) {
    return `${Math.floor(view / 1000000)}M`;
  }

  return `${Math.floor(view / 1000000000)}B`;
}

export function getDuration(number: number): {
  day: number;
  hour: number;
  minute: number;
} {
  if (number?.toString()?.length === 10) {
    number = number * 1000;
  }
  const date = new Date(number);
  const now = new Date();
  let diff = now.getTime() - date.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff = diff - day * (1000 * 60 * 60 * 24);
  const hour = Math.floor(diff / (1000 * 60 * 60));
  diff = diff - hour * (1000 * 60 * 60);
  const minute = Math.floor(diff / (1000 * 60));
  return {
    day,
    hour,
    minute,
  };
}

export function getRecentTimeStrFromTimeStamp(number: number): string {
  number = parseInt(number.toString());

  if (number?.toString()?.length === 10) {
    number = number * 1000;
  }
  const date = new Date(number);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const minute = Math.floor(diff / (1000 * 60));
  if (day > 0) {
    return `${day} ngày trước`;
  } else if (hour > 0) {
    return `${hour} giờ trước`;
  } else if (minute > 0) {
    return `${minute} phút trước`;
  } else {
    return 'Vừa xong';
  }
}

export function getTimeStrFromMillisecond(ms: number) {
  const day = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hour = Math.floor(ms / (1000 * 60 * 60));
  const minute = Math.floor(ms / (1000 * 60));
  if (day > 0) {
    return `${day} ngày`;
  } else if (hour > 0) {
    return `${hour} giờ`;
  } else if (minute > 0) {
    return `${minute} phút`;
  } else {
    return 'Vừa xong';
  }
}

export function convertToLocaleString(date: string | Date | undefined): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (date) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  return '';
}

export function showTimeDuration(date: string | Date | undefined): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (!date) return '';

  const { day, hour, minute } = getDuration(date.getTime());
  if (day < 2) {
    let time = '';
    if (hour > 0 || day > 0) {
      time += `${day * 24 + hour} giờ `;
    }
    if (minute > 0) {
      time += `${minute} phút `;
    }

    if (time) {
      return `${time} trước`;
    }
  }

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
