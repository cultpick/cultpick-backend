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

export type PerformanceWithPrice = Performance & {
  pcseguidance: string; //티켓가격
};
