const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// fake yearly values
const caseData = {
  labels: MONTH_NAMES,
  data2022: [200, 210, 250, 230, 270, 290, 310, 280, 260, 240, 230, 250],
  data2023: [220, 225, 260, 245, 275, 300, 320, 290, 270, 260, 250, 270]
};

const outerRegionData = {
  labels: MONTH_NAMES,
  data2022: [12, 14, 11, 10, 15, 17, 18, 16, 13, 11, 10, 12],
  data2023: [14, 15, 13, 12, 16, 20, 21, 19, 17, 14, 13, 15]
};

function makeBigLine(idCanvas, idVal, idMonth, dataset1, dataset2, label1, label2, color1, color2) {
  const ctx = document.getElementById(idCanvas).getContext('2d');
  const elVal = document.getElementById(idVal);
  const elMonth = document.getElementById(idMonth);

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTH_NAMES,
      datasets: [
        {
          label: label1,
          data: dataset1,
          borderColor: color1,
          backgroundColor: color1 + '33',
          tension: 0.4,
          fill: false,
          pointRadius: 5
        },
        {
          label: label2,
          data: dataset2,
          borderColor: color2,
          backgroundColor: color2 + '33',
          tension: 0.4,
          fill: false,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          enabled: true
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      onHover: (event, chartEls) => {
        const points = chartEls;
        if (points.length > 0) {
          const index = points[0].index;
          const value = dataset2[index];
          elVal.textContent = value != null ? value.toFixed(1) : '—';
          elMonth.textContent = MONTH_NAMES[index];
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

makeBigLine(
  'casesFiledChart',
  'casesFiledVal',
  'casesFiledMonth',
  caseData.data2022,
  caseData.data2023,
  '2022',
  '2023',
  '#007acc',
  '#ff6600'
);

makeBigLine(
  'outerRegionChart',
  'outerVal',
  'outerMonth',
  outerRegionData.data2022,
  outerRegionData.data2023,
  '2022',
  '2023',
  '#2c974b',
  '#c0392b'
);
