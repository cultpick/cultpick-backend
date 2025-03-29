export type Performance = {
  mt20id: string;
  prfnm: string;
  genrenm: string;
  prfstate: string;
  prfpdfrom: string;
  prfpdto: string;
  poster: string;
  fcltynm: string;
  openrun: string;
  area: string;
};

export type PerformanceDetail = Performance & {
  pcseguidance: string; //티켓가격
  entrpsnmH: string; //주최
  styurls: Record<string, { styurl: string }>; // 소개 이미지 URL 목록
};
