export interface AnalyticsData {
  dataByHour: number[];
  net: number;
  avg: number;
  busiestHour: number;
}

export interface UptimeEntry {
  timestamp: string; 
  duration: number; 
}


interface DayData {
  _id: {
    hour: number;
  };
  count: number;
  data0: number;
  data1: number;
}

interface ReportData {
  totalAnalytics: number;
  avgAnalytics: number;
  busiestDays: DayData[];
  quietestDays: DayData[];
  totalUptime: number;
  totalDowntime: number;
}

export interface ReportResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    reportData: ReportData;
  };
}