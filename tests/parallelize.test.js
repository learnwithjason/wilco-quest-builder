jest.mock("./agent.js", () => {
  async function sleep(timeInMilliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeInMilliseconds);
    });
  }

  return {
    Items: {
      get: async () => {
        getItemsRequestTimestamp = Date.now();
        await sleep(2000);
      }
    },
    Comments: {
      forItem: async () => {
        getCommentsRequestTimestamp = Date.now();
        await sleep(2000);
      }
    }
  }
});

import { getItemAndComments } from "./components/Item/utils/ItemFetcher";
let getItemsRequestTimestamp, getCommentsRequestTimestamp = null;

test("both requests for Item and Comment are executed at the same time", async () => {
  await getItemAndComments();
  expect(getItemsRequestTimestamp).toEqual(getCommentsRequestTimestamp);
})
