'use strict';

(function () {
    angular
        .module('app.modules.chart')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$q', 'measurements', 'dateFilter'];
    function ChartController($q, measurements, dateFilter) {

        var chartViewModel = this;
        chartViewModel.title = 'Chart';
        chartViewModel.sensorChartConfig = {
            options: {
                chart: {
                    zoomType: 'xy'
                },
                tooltip: {
                    shared: true
                }
            },
            title: {
                text: 'Sensor Values'
            },
            xAxis: {
                crosshair: true
            },
            yAxis: [
                {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        format: '{value} \u00B0C',
                        style: {
                            color: Highcharts.getOptions().colors[3]
                        }
                    }
                },
                {
                    title: {
                        text: 'Air Pressure'
                    },
                    labels: {
                        format: '{value} hPa',
                        style: {
                            color: Highcharts.getOptions().colors[4]
                        }
                    },
                    opposite: true
                },
                {
                    title: {
                        text: 'Light'
                    },
                    labels: {
                        format: '{value} Lux',
                        style: {
                            color: Highcharts.getOptions().colors[6]
                        }
                    },
                    opposite: true
                }
            ],
            series: [
                {
                    xAxis: 0,
                    data: [1434888559, 1434888599]
                },
                {
                    yAxis: 2,
                    name: 'Light',
                    type: 'column',
                    color: Highcharts.getOptions().colors[6],
                    data: getAllSensorValuesOfMeasurementLabel('Light'),
                    tooltip: {
                        valueSuffix: ' Lux'
                    }
                },
                {
                    yAxis: 1,
                    name: 'Air Pressure',
                    opposite: true,
                    dashStyle: 'shortdot',
                    type: 'spline',
                    color: Highcharts.getOptions().colors[4],
                    tooltip: {
                        valueSuffix: ' hPa'
                    },
                    marker: {
                        enabled: false
                    },
                    data: getAllSensorValuesOfMeasurementLabel('Air Pressure')
                },
                {
                    yAxis: 0,
                    name: 'Temperature',
                    type: 'spline',
                    color: Highcharts.getOptions().colors[3],
                    tooltip: {
                        valueSuffix: ' \u00B0C'
                    },
                    marker: {
                        enabled: false
                    },
                    data: getAllSensorValuesOfMeasurementLabel('Temperature')
                }
            ]
        };

        function getAllSensorValuesOfMeasurementLabel(typeLabel) {
            var sensorValues = [];

            for (var im = 0; im < measurements.length; im++) {
                var measurement = measurements[im];
                for (var is = 0; is < measurement.sensorValues.length; is++) {
                    var sensorValue = measurement.sensorValues[is];
                    if (sensorValue.typeLabel === String(typeLabel)) {
                        sensorValues.push(
                            {
                                y: sensorValue.value,
                                name: dateFilter(measurement.takenOn, 'dd.MM.yyyy \'at\' HH:mm')
                            }
                        );
                        break;
                    }
                }
            }

            return sensorValues;
        }
    }
})();
