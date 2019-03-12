export class Task {

    public title: String;
    public startTime: any;
    public endTime: any;
    public timeNeeded: any;

    constructor(title, startTime, endTime) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    static setTimeNeeded(startTime, endTime) {
        let startTimeSplit = startTime.split(':');
        let startTimeHours = parseInt(startTimeSplit[0]);
        let startTimeMinutes = parseInt(startTimeSplit[1]);

        let endTimeSplit = endTime.split(':');
        let endTimeHours = parseInt(endTimeSplit[0]);
        let endTimeMinutes = parseInt(endTimeSplit[1]);

        // return '' + (endTimeHours - startTimeHours) + ':' + Math.abs(endTimeMinutes - startTimeMinutes) + ':00'

        // console.log((endTimeHours - startTimeHours) + ':' + Math.abs(endTimeMinutes - startTimeMinutes) + ':00');
        return this.pad((endTimeHours - startTimeHours), 2) + ':' + this.pad(Math.abs(endTimeMinutes - startTimeMinutes),2) + ':00';
    }

    // updateTimeNeeded() {
    //     this.timeNeeded = this.setTimeNeeded(this.startTime, this.endTime);
    // }

    static pad(num, size) {
        let s = num + "";
        while (s.length < size) 
            s = "0" + s;
        return s;
    }

    // getTimeNeeded(startTime, endTime) {
    //     let startTimeSplit = startTime.split(':');
    //     let startTimeHours = startTimeSplit[0];
    //     let startTimeMinutes = startTimeSplit[1];

    //     let endTimeSplit = endTime.split(':');
    //     let endTimeHours = endTimeSplit[0];
    //     let endTimeMinutes = endTimeSplit[1];

    // }
}
