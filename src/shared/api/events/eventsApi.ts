import axiosInstance from "../axiosInstance";

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

export const fetchEvents = async (
  videostandId: string
): Promise<ServerResponse> => {
  const body = JSON.stringify({
    query: `query videostandEvents($videostand_id: ID!) {
      videostandEvents(videostand_id: $videostand_id) {
        current_and_upcoming {
          title, is_main, dt_start, dt_end, dt_create
        }
        finished {
          title, is_main, dt_start, dt_end, dt_create
        }
      }
    }`,
    variables: {
      videostand_id: videostandId,
    },
  });

  const { data } = await axiosInstance.post<ServerResponse>("", body);
  return data;
};
