import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const generateData = () => {
  const analyticsData = [];
  const uptimeData = [];
  const deviceId = uuidv4();

  for (let i = 0; i < 60; i++) { // 60 days
    for (let h = 0; h < 24; h++) { // 24 hours
      for (let m = 0; m < 60; m++) { // 60 minutes
        const timestamp = new Date(2024, 6, i, h, m, 0).getTime();

        // Generate random data for analytics
        const data = Math.floor(Math.random() * 2); // 0 or 1
        analyticsData.push({
          timestamp: new Date(timestamp),
          metadata: {
            deviceId,
            data,
            timestamp,
          },
        });

        // Generate uptime data every hour
        if (m === 0) {
          const state = h < 14 ? 'connected' : 'disconnected'; // Assume device works 14 hours a day
          uptimeData.push({
            timestamp: new Date(timestamp),
            metadata: {
              deviceId,
              data: state,
              timestamp,
            },
          });
        }
      }
    }
  }

  fs.writeFileSync('data/analyticsData.json', JSON.stringify(analyticsData, null, 2));
  fs.writeFileSync('data/uptimeData.json', JSON.stringify(uptimeData, null, 2));
};

generateData();
