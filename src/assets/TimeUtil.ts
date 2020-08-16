import { Time } from './Time'

export class TimeUtil {

    static sumUpTimes(_dateOne: Date, _dateTwo: Date) {

        let dateOne = {
            hoursInSeconds: _dateOne.getHours() * 60 * 60,
            minutesInSeconds: _dateOne.getMinutes() * 60,
            seconds: _dateOne.getSeconds()
        };

        let dateTwo = {
            hoursInSeconds: _dateTwo.getHours() * 60 * 60,
            minutesInSeconds: _dateTwo.getMinutes() * 60,
            seconds: _dateTwo.getSeconds()
        };


        let sumSeconds = 0;
        for (const property in dateOne) {
            sumSeconds += dateOne[property];
        }

        for (const property in dateTwo) {
            sumSeconds += dateTwo[property];
        }

        return TimeUtil.secondsConvertToTime(sumSeconds);
    }

    static differDates(_endDate:Date, _startDate:Date) {
        let millisecondsResult = +_endDate - +_startDate;
        return this.millisecondsConvertToTime(millisecondsResult);
    }

    static secondsConvertToTime(seconds:number) {
        let mins = seconds / 60;
        let hoursWithChange = (mins / 60);
        let hours = Math.floor(hoursWithChange);
        let minutesWithChange = (hoursWithChange - hours) * 60;
        let minutes = Math.round(minutesWithChange);

        return new Time(hours, minutes);
    }

    static millisecondsConvertToTime(milliseconds:number) {
        let mins = milliseconds / 1000 / 60;
        let hoursWithChange = (mins / 60);
        let hours = Math.floor(hoursWithChange);
        let minutesWithChange = (hoursWithChange - hours) * 60;
        let minutes = Math.round(minutesWithChange);

        return new Time(hours, minutes);
    }

}