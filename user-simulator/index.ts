import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const WEBHOOK_URL: string = process.env.WEBHOOK_URL!;

const emailPool: string[] = [];

const getRandomEmail = (): string => {
  if (Math.random() < 0.6 && emailPool.length > 0) {
    return emailPool[Math.floor(Math.random() * emailPool.length)];
  }
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.com'];
  const name = Math.random().toString(36).substring(7);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${name}@${domain}`;
  emailPool.push(email);
  return email;
};

const getRandomPostId = (): string => {
  return `post_${Math.floor(Math.random() * 10000)}`;
};

const getRandomUtms = (): Record<string, string> => {
  const utmSourceOptions = ['tiktok', 'facebook', 'instagram', 'twitter'];
  const utmMediumOptions = ['socialpaid', 'socialorganic', 'email', 'cpc'];
  const utmChannelOptions = ['web', 'mobile', 'desktop'];

  const utms: Record<string, string> = {
    utm_source:
      utmSourceOptions[Math.floor(Math.random() * utmSourceOptions.length)],
    utm_medium:
      utmMediumOptions[Math.floor(Math.random() * utmMediumOptions.length)],
    utm_campaign: new Date(Date.now() - Math.floor(Math.random() * 31536000000))
      .toISOString()
      .split('T')[0],
    utm_channel:
      utmChannelOptions[Math.floor(Math.random() * utmChannelOptions.length)],
  };

  const utmKeys = Object.keys(utms);
  const numUtms = Math.floor(Math.random() * (utmKeys.length - 1)) + 1;
  return Object.fromEntries(
    utmKeys.slice(0, numUtms + 1).map((key) => [key, utms[key]]),
  );
};

const sendWebhookRequest = async (): Promise<void> => {
  const email = getRandomEmail();
  const postId = getRandomPostId();
  const utms = getRandomUtms();

  const url = new URL(WEBHOOK_URL);
  url.searchParams.append('email', email);
  url.searchParams.append('id', postId);

  Object.entries(utms).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await axios.get(url.toString());
    console.log(
      `[${new Date().toISOString()}] Webhook called successfully:`,
      response.status,
    );
  } catch (error: any) {
    console.error(
      `[${new Date().toISOString()}] Error calling webhook:`,
      error.message,
    );
  }
};

const startSimulator = () => {
  sendWebhookRequest();
  setInterval(sendWebhookRequest, 60 * 60 * 1000);
};

startSimulator();
