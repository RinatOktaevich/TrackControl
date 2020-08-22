import { Time } from './Time'

export class TimeUtil {

    static sumUpTimes(_timeOne: Time, _timeTwo: Time) {

        let dateOne = {
            hoursInSeconds: _timeOne.hours * 60 * 60,
            minutesInSeconds: _timeOne.minutes * 60
        };

        let dateTwo = {
            hoursInSeconds: _timeTwo.hours * 60 * 60,
            minutesInSeconds: _timeTwo.minutes * 60
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

    static differDates(_endDate: Date, _startDate: Date) {
        let millisecondsResult = +_endDate - +_startDate;
        return this.millisecondsConvertToTime(millisecondsResult);
    }

    static secondsConvertToTime(seconds: number) {
        let mins = seconds / 60;
        let hoursWithChange = (mins / 60);
        let hours = Math.floor(hoursWithChange);
        let minutesWithChange = (hoursWithChange - hours) * 60;
        let minutes = Math.round(minutesWithChange);

        return new Time(hours, minutes);
    }

    static minutesConvertToTime(mins: number) {

        let hoursWithChange = (mins / 60);
        let hours = Math.floor(hoursWithChange);
        let minutesWithChange = (hoursWithChange - hours) * 60;
        let minutes = Math.round(minutesWithChange);

        return new Time(hours, minutes);
    }

    static millisecondsConvertToTime(milliseconds: number) {
        let mins = milliseconds / 1000 / 60;
        let hoursWithChange = (mins / 60);
        let hours = Math.floor(hoursWithChange);
        let minutesWithChange = (hoursWithChange - hours) * 60;
        let minutes = Math.round(minutesWithChange);

        return new Time(hours, minutes);
    }

    static timeToStrokeLength(time: Time, oneHourPxSize: number): number {
        return (time.hours * oneHourPxSize) + (oneHourPxSize / 60 * time.minutes);
    }

    static strokeLengthToTime(pixels: number): Time {
        let minutes = (pixels / 45) * 60;
        return this.minutesConvertToTime(minutes);
    }


    static dateToTime(date: Date) {
        return new Time(date.getHours(), date.getMinutes());
    }


    static differTimes(bigger: Time, less: Time): Time {
        let biggerInseconds = (bigger.hours * 60 * 60) + (bigger.minutes * 60);
        let lessInseconds = (less.hours * 60 * 60) + (less.minutes * 60);
        let diffInSeconds = biggerInseconds - lessInseconds;

        return TimeUtil.secondsConvertToTime(diffInSeconds);
    }
}