import { Event } from "./Event";
import { EventType } from "./EventType";

export const canvasConf = {
    width: 1200,
    heigth: 300,
    grid: {
        rows: 4,
        cols: 24,
        cell: {
            size: 45,
            dividersLength: {
                center: 20,
                sides: 10
            }
        }
    }
}






export const dataArr: Event[] =
    [
        //work from last day
        new Event(new Date(2020, 8, 15, 0, 0), 46.562638, 30.836545, EventType.OnDuty),

        //sleep
        new Event(new Date(2020, 8, 15, 1, 25), 46.564256, 30.843106, EventType.SleeperBerth),
        //woke up
        new Event(new Date(2020, 8, 15, 7, 30), 46.564256, 30.843106, EventType.OffDuty),
        //stared to work
        new Event(new Date(2020, 8, 15, 8, 5), 46.562850, 30.835896, EventType.OnDuty),
        //started to drive
        new Event(new Date(2020, 8, 15, 8, 30), 46.562850, 30.835896, EventType.Driving),
        //stoped for some business
        new Event(new Date(2020, 8, 15, 12, 15), 46.493816, 30.572485, EventType.OnDuty),
        //lunch
        new Event(new Date(2020, 8, 15, 13, 10), 46.493816, 30.572485, EventType.OffDuty),

        //drive again
        new Event(new Date(2020, 8, 15, 14, 10), 46.493816, 30.572485, EventType.Driving),

        //stopped to refuel
        new Event(new Date(2020, 8, 15, 18, 35), 47.226305, 29.179592, EventType.OnDuty),

        //continue driving
        new Event(new Date(2020, 8, 15, 18, 52),47.226305, 29.179592, EventType.Driving),

        //end of the day
        new Event(new Date(2020, 8, 15, 21, 2), 47.036743, 28.900477, EventType.OnDuty),

        //go home
        new Event(new Date(2020, 8, 15, 22, 35), 47.036743, 28.900477, EventType.OffDuty),

    ];

