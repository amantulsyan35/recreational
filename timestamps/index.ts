const timeStampsDirectory = new Map<string, Array<number>>();
const timeStampsDirectoryWithCheckPoint = new Map<
  string,
  Array<{ checkPoint: number; commodityPrice: number }>
>();

const findHighestCommodityPriceForAGivenTimeStamp = (
  timestamp: string,
): number | null => {
  const prices = timeStampsDirectory.get(timestamp);
  if (!prices || prices.length === 0) return null;
  // O(n) scan for max
  let max = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > max) max = prices[i];
  }
  return max;
};

const findHighestCommodityPriceForAGivenTimeStampAndCheckPoint = (
  timestamp: string,
  checkPoint: number,
): number | null => {
  const entries = timeStampsDirectoryWithCheckPoint.get(timestamp) ?? [];

  const valid = entries.filter((e) => e.checkPoint <= checkPoint);
  if (valid.length === 0) return null;

  let max = valid[0].commodityPrice;
  for (let i = 1; i < valid.length; i++) {
    if (valid[i].commodityPrice > max) {
      max = valid[i].commodityPrice;
    }
  }
  return max;
};
