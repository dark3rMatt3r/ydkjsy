const startWorkTime = "07:30";
const endWorkTime = "17:45";

function scheduleMeeting(startMeetingTime: string, duration: number) {
  const startMeeting = getHoursAndMinutes(startMeetingTime);
  const durationObject = convertMinutesToHoursAndMinutes(duration);
  const endMeeting = calculateMeetingEndTime(startMeeting, durationObject);
  if (notAString(startMeeting.hours) || notAString(startMeeting.minutes)) {
    return false;
  }
  return canScheduleMeeting(startMeeting, endMeeting);
}

function notAString(time: string | null) {
  return typeof time != "string"
}

function getHoursAndMinutes(startTime: string) {
  var [,hours, minutes] = startTime.match(/^(\d{1,2}):(\d{2})$/) || [];
  return {
    hours: hours,
    minutes: minutes,
  }
}

function convertMinutesToHoursAndMinutes(duration: number) {
  if (duration >= 60) {
    return {
      hours: duration / 60,
      minutes: duration % 60
    }
  } else {
      return {
        hours: 0,
        minutes: duration
      }
  }
}

function calculateMeetingEndTime(start: {hours: string, minutes: string}, duration: { hours: number; minutes: number }) {
  let hours = Number.parseInt(start.hours) + duration.hours;
  let minutes = Number.parseInt(start.minutes) + duration.minutes;
  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }
  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
  }
}

function canScheduleMeeting(
  startMeetingTime: {hours: string, minutes: string},
  endMeetingTime: {hours: string, minutes: string}
) {
  const startMeeting = `${startMeetingTime.hours.padStart(2,"0")}:${startMeetingTime.minutes}`;
  const endMeeting = `${endMeetingTime.hours.padStart(2,"0")}:${endMeetingTime.minutes}`;

  return startWorkTime <= startMeeting && endWorkTime >= endMeeting;
}

let canMeet = scheduleMeeting("7:00",15);
console.log(`Is it possible to meet? : ${canMeet}`); // false

canMeet = scheduleMeeting("07:15",30);    // false
console.log(`Is it possible to meet? : ${canMeet}`);

canMeet = scheduleMeeting("7:30",30);     // true
console.log(`Is it possible to meet? : ${canMeet}`);

canMeet = scheduleMeeting("11:30",60);    // true
console.log(`Is it possible to meet? : ${canMeet}`);

canMeet = scheduleMeeting("17:00",45);    // true
console.log(`Is it possible to meet? : ${canMeet}`);

canMeet = scheduleMeeting("17:30",30);    // false
console.log(`Is it possible to meet? : ${canMeet}`);

canMeet = scheduleMeeting("18:00",15);    // false
console.log(`Is it possible to meet? : ${canMeet}`);
