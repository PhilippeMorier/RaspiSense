'use strict';

(function () {
    angular
        .module('app.modules.chart')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$q', 'measurements'];
    function ChartController($q, measurements) {

        var chartViewModel = this;
        chartViewModel.title = 'Chart';
        chartViewModel.sensorChartConfig = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Sensor Values'
            },
            /*tooltip: {
                shared: true,
                shadow: false
            },*/
            xAxis: {
                //type: 'datetime',
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
                }
            ],
            series: [
                {
                    yAxis: 0,
                    name: 'Temperature',
                    type: 'spline',
                    tooltip: {
                        valueSuffix: ' \u00B0C'
                    },
                    data: getAllSensorValuesOfMeasurementLabel('Temperature')
                },
                {
                    yAxis: 1,
                    name: 'Air Pressure',
                    opposite: true,
                    dashStyle: 'shortdot',
                    type: 'spline',
                    tooltip: {
                        valueSuffix: ' hPa'
                    },
                    marker: {
                        enabled: false
                    },
                    data: getAllSensorValuesOfMeasurementLabel('Air Pressure')
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
                        sensorValues.push(sensorValue.value);
                        break;
                    }
                }
            }

            return sensorValues;
        }
    }
})();
