import { dfs_xy_conv } from './convertXY';

export async function getKmaWeather(lat: number, lon: number): Promise<string> {
  const { x, y } = dfs_xy_conv(lat, lon);

  const serviceKey = 'nJNDuGtwE7hBL4aZJU7JY0OKdYibflfnZrJqSnCGnh9Z9vUYNRpCVc3oCaqcEP7sS5aN%2BY%2F0HBaZP9RiBkaXRQ%3D%3D';

  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, ''); // yyyyMMdd
  const baseTime = '0500'; // 새벽 5시 고정 (가장 안정적인 시간)

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;

  const res = await fetch(url);
  const data = await res.json();

  const items = data.response.body.items.item;

  const skyCode = items.find((i: any) => i.category === 'SKY')?.fcstValue;
  const temp = items.find((i: any) => i.category === 'TMP')?.fcstValue;

  const skyDesc =
    skyCode === '1' ? '맑음' :
    skyCode === '3' ? '구름 많음' :
    skyCode === '4' ? '흐림' : '알 수 없음';

  return `${skyDesc}, ${temp}도`;
}
