
export class Time {
    hours: number;
    minutes: number;
    constructor(_hours: number, _minutes: number) {
        this.hours = _hours;
        this.minutes = _minutes;
    }


    toString(): string {
        let h;
        let m;

        h = this.hours > 9 ? `${this.hours}` : `0${this.hours}`;
        m = this.minutes > 9 ? `${this.minutes}` : `0${this.minutes}`;

        return `${h}:${m}`;
    }
}