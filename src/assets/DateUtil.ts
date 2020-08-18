export class DateUtil {

    static DateConverter(date: Date): string {
        let dayOfTheWeek: string = DateUtil.DayConverter(date.getDay());

        let res: string = `${dayOfTheWeek}  ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        return res;
    }



    static DayConverter(numberOfDay: number): string {
        switch (numberOfDay) {
           
            case 0:
                return "Sunday";
                break;
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
            case 6:
                return "Saturday";
                break;
          
        }
    }

}