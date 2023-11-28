import { ResponseDto, ResponseStatusCode } from '~~/utils/base';

const useStatCampaignJobStatus = async () =>
  await useFetch(`${useRuntimeConfig().baseUrlApi}/campaign/count/jobResult`, {
    transform: (res) => {
      const timelines: {
        number: number;
        startTime: number;
      }[] = (
        (res as ResponseDto).status === ResponseStatusCode.SUCCESS
          ? (res as ResponseDto).data
          : []
      ) as any;

      const toDateMonth = (ts: number) => {
        if (!ts) return '';
        const date = new Date(ts * 1000);
        const d = date.getDate();
        const m = date.getMonth() + 1;
        return `${d < 10 ? `0${d}` : d}/${m < 10 ? `0${m}` : m}`;
      };

      const _datum = timelines.map((timeline: any) => timeline.number);
      const _label = timelines.map((timeline: any) =>
        toDateMonth(timeline.startTime),
      );

      return {
        labels: _label,
        datasets: [
          {
            label: 'Số lượng pin success',
            data: _datum,
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgba(100, 255, 0, 1)',
            borderWidth: 2,
          },
        ],
      };
    },
    key: 'get-stat-campaign-job-result',
    method: 'POST',
    server: false,
  });

export { useStatCampaignJobStatus };
