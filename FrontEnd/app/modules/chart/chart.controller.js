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
            xAxis: {
                type: 'datetime'
                //tickInterval: 36e5,
                //minorTickInterval: 36e5 / 2,
                //gridLineWidth: 1
            },
            yAxis: [
                {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        format: '{value}\u00B0C'
                    }
                },
                {
                    title: {
                        text: 'Air Pressure'
                    },
                    labels: {
                        format: '{value}hPa'
                    },
                    opposite: true
                }
            ],
            series: [
                {
                    yAxis: 0,
                    name: 'Temperature',
                    data: getAllSensorValuesOfMeasurementLabel('Temperature')
                },
                {
                    yAxis: 1,
                    name: 'Air Pressure',
                    data: getAllSensorValuesOfMeasurementLabel('Air Pressure'),
                    opposite: true
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
