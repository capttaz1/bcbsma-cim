const smaHandler = {};

smaHandler.ComputeSMA = (data, size) => {
  let r_avgs = [],
    avg_prev = 0;
  for (let i = 0; i <= data.length - size; i++) {
    let curr_avg = 0.0,
      t = i + size;
    for (let k = i; k < t && k <= data.length; k++) {
      curr_avg += data[k]["steps"] / size;
    }
    r_avgs.push({ set: data.slice(i, i + size), avg: curr_avg });
    avg_prev = curr_avg;
  }
  return r_avgs;
};

export default smaHandler;
