export interface Event {
  title: string;
  is_main: boolean;
  dt_start: string;
  dt_end: string;
  dt_create: string;
}

interface VideostandEvents {
  current_and_upcoming: Event[];
  finished: Event[];
}

export interface ServerResponse {
  data: {
    videostandEvents: VideostandEvents;
  };
}
