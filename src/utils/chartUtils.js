export function refactorHistoricalArray(history, key, limit) {
  const { historical } = history;
  const property = historical.map((record) => record[key]);
  return property.splice(0, limit).reverse();
}

export function generateDataObj(labels, data, item) {
  return {
    labels,
    datasets: [
      {
        label: item,
        backgroundColor: 'rgb(255,99,132)',
        borderColor: 'rgb(255,99,132)',
        data
      }
    ]
  };
}

export function generateConfig(type, data, options = {}) {
  return {
    type,
    data,
    options
  };
}