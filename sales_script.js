const ctx = document.getElementById('salesChart').getContext('2d');

const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(54, 162, 235, 0.2)');
gradient.addColorStop(1, 'rgba(54, 162, 235, 0)');

const dataPenjualan = [120, 150, 180, 200, 220, 250, 300, 320, 350, 380, 400, 450];
const labelsBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const data = {
    labels: labelsBulan,
    datasets: [{
        label: 'Penjualan Bulanan',
        data: dataPenjualan,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Perkembangan Penjualan Bulanan'
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        return 'Bulan: ' + context[0].label;
                    },
                    label: function(context) {
                        return 'Penjualan: ' + context.parsed.y;
                    },
                    afterLabel: function(context) {
                        const dataIndex = context.dataIndex;
                        const penjualan = context.dataset.data[dataIndex];
                        return [
                            'Detail Informasi: ' + '(Belum diimplementasikan)',
                            'Bulan: ' + labelsBulan[dataIndex],
                            'Target Tercapai: ' + (penjualan >= 300 ? 'Ya' : 'Tidak')
                        ];
                    }
                }
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 300,
                        yMax: 300,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        label: {
                            content: 'Target Penjualan',
                            enabled: true,
                            position: 'center'
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Bulan'
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Jumlah Penjualan'
                },
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)'
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutBounce'
        }
    }
};

const salesChart = new Chart(ctx, config);
