import { useInfiniteQuery } from "@tanstack/react-query";

import { PAGINATION_LIMIT } from "@/services/api-factory";
import campaignService, { campaignKey } from "@/services/campaign-service";

const useGetCampaigns = ({ filter }: { filter: string }) => {
  return useInfiniteQuery({
    queryKey: [campaignKey, filter],
    queryFn: ({ pageParam = 1 }) => campaignService.getCampaigns({ pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.campaigns.length === PAGINATION_LIMIT ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export default useGetCampaigns;