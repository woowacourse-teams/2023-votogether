import { ReportRequest } from '@type/report';

import { postFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const reportContent = async (reportData: ReportRequest) => {
  return await postFetch(`${BASE_URL}/report`, reportData);
};
