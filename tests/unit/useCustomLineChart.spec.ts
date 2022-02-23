import { useDoDItemsLineChart } from "@/hooks/useDoDItemsLineChart";
import * as api from "@/apis/DoDApi";
import { DoDItems } from "@/apis/DoDApi";
import { flushPromises, mount } from "@vue/test-utils";

function mockDoDItemsApi() {
  const response = {
    items: [
      {
        name: "Long Method Mock",
        data: [
          { id: 1, date: "2020-01-01", value: 10, comment: 'something'},
          { id: 2, date: "2020-01-02", value: 20, comment: 'something'},
          { id: 3, date: "2020-01-03", value: 30, comment: 'something'},
        ]
      },
      {
        name: "Coverage Mock",
        data: [
          { id: 1, date: "2020-01-01", value: 81, comment: 'something'},
          { id: 2, date: "2020-01-02", value: 80, comment: 'something'},
          { id: 3, date: "2020-01-03", value: 90, comment: 'something'},
        ]
      }
    ]
  } as DoDItems
  jest.spyOn(api, "findDoDItems").mockResolvedValueOnce(response);
  return response
}

describe("useDoDItemsLineChart", () => {
  it("should find computed ChartData From DoDItemsAPI", async () => {
    //given
    mockDoDItemsApi()
    //when
    const actual = useDoDItemsLineChart()
    await flushPromises();
    //then
    expect(actual.chartDataList.value.length).toEqual(2)
    expect(actual.chartDataList.value[0].chartData.datasets[0].label).toEqual('Long Method Mock')
    expect(actual.chartDataList.value[1].chartData.datasets[0].label).toEqual('Coverage Mock')
  });
});