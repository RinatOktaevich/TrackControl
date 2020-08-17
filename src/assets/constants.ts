import { Data } from "./Data";
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




 

export const dataArr:Data[] =
    [
        //sleep
        new Data(new Date(2020, 8, 15, 1, 25), 25, 35, EventType.SleeperBerth),
        //woke up
        new Data(new Date(2020, 8, 15, 6, 43), 25, 35, EventType.OffDuty),
        //stared to work
        new Data(new Date(2020, 8, 15, 7, 51), 25, 35, EventType.OnDuty),
        //started to drive
        new Data(new Date(2020, 8, 15, 8, 20), 25, 35, EventType.Driving),
        //stoped for some business
        new Data(new Date(2020, 8, 15, 12, 15), 25, 35, EventType.OnDuty),
        //lunch
        new Data(new Date(2020, 8, 15, 13, 10), 25, 35, EventType.OffDuty),

        //drive again
        new Data(new Date(2020, 8, 15, 14, 10), 25, 35, EventType.Driving),

        //stopped to refuel
        new Data(new Date(2020, 8, 15, 18, 35), 25, 35, EventType.OnDuty),

        //continue driving
        new Data(new Date(2020, 8, 15, 18, 52), 25, 35, EventType.Driving),

        //end of the day
        new Data(new Date(2020, 8, 15, 21, 2), 25, 35, EventType.OnDuty),

        //go home
        new Data(new Date(2020, 8, 15, 21, 45), 25, 35, EventType.OffDuty)

    ];

