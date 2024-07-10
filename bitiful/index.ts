import process from 'process';

const token = process.env.TOKEN;
function formatSize(size: number) {
  const units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
  ];

  let i = 0;
  while (
    size >= 1024 &&
    i < units.length - 1
  ) {
    size /= 1024;
    i++;
  }

  return (
    size.toFixed(2) + ' ' + units[i]
  );
}


function groupAndDisplayDataByPath(
  data
) {
  // 按照 path 字段分组数据
  const groupedData = data.reduce(
    (acc, item) => {
      const key = item.path;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {}
  );

  // 格式化分组数据并计算每个分组的累计大小
  const formattedData = Object.keys(
    groupedData
  ).map((key) => {
    const group = groupedData[key];
    const totalSize = group.reduce(
      (acc, item) => acc + item.size,
      0
    );
    return {
      path: key,
      single: formatSize(group[0]?.size || 0),
      count: group.length,
      size: totalSize,
    };
  });
  formattedData.sort(
    (a, b) => b.size - a.size
  );
  formattedData.forEach((item) => {
    item.size = formatSize(item.size);
  });

  // 使用 console.table 打印格式化后的数据
  console.table(formattedData);
}

async function queryLogsWithinThreeDays(
  ago: number
) {
  const currentTime =
    new Date().getTime() * 1000 * 1000;
  const threeDaysMs =
    ago * 24 * 60 * 60 * 1000 * 1000 * 1000;
  let startTime =
    currentTime - threeDaysMs;

  let totalLogs = [];

  while (
    startTime < currentTime
  ) {
    const logs = await fetchData(startTime);
    if (!logs.length || logs.length < 1000) {
      break
    }
    totalLogs = totalLogs.concat(logs);
    startTime = logs[logs.length - 1].access_time
    groupAndDisplayDataByPath(totalLogs);
  }

  return totalLogs;
}

function fetchData(start_time: number) {
  const data = {
    start_time: `${start_time}`,
    codes: '200',
    limit: '1000',
  };
  const query = new URLSearchParams(
    data
  ).toString();

  // TODO: 读文件判断是否有缓存结果
  return fetch(
    'https://api.bitiful.com/cdn/data/cdn.bitiful.sugarat.top/logs' +
    `?${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type':
          'application/json',
        Authorization: token,
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      const logs = res?.data || []
      if
      return logs
    })
    .catch((error) =>
      console.error('Error:', error)
    );
}

queryLogsWithinThreeDays(1)