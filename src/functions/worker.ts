import { train, net, dataset } from '@/functions/ai';

self.onmessage = (e) => {
  const trainedNet = train(net, dataset, 2000);
  postMessage(trainedNet);
};
