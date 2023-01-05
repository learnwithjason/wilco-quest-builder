import { getItemAndComments } from './components/Item/utils/ItemFetcher';

let getItemsTimestamp;
let getCommentsTimestamp;

describe('Check that async calls are made in parallel', () => {
  beforeEach(() => {
    jest.mock('./agent.js', () => {
      return {
        Items: {
          get: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                getItemsTimestamp = Date.now();
                resolve();
              }, 1500);
            });
          },
        },
        Comments: {
          forItem: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                getCommentsTimestamp = Date.now();
                resolve();
              }, 1000);
            });
          },
        },
      };
    });
  });

  it('calls both the item and comments fetchers at the same time', async () => {
    await getItemAndComments();

    expect(getCommentsTimestamp).toEqual(getItemsTimestamp);
  });
});
