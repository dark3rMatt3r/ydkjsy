const startWorkTime = "09:00";
const endWorkTime = "18:00";

function scheduleMeeting(startMeetingTime: string, duration: number) {
  const startWork = getHoursAndMinutes(startWorkTime);
  const endWork = getHoursAndMinutes(endWorkTime);
  const startMeeting = getHoursAndMinutes(startMeetingTime);
  const durationObject = convertMinutesToHoursAndMinutes(duration);
  const endMeeting = calculateMeetingEndTime(startMeeting, durationObject);

  return canScheduleMeeting(startWork, endWork, startMeeting, endMeeting);
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
  startWorkTime: {hours: string, minutes: string},
  endWorkTime: {hours: string, minutes: string},
  startMeetingTime: {hours: string, minutes: string},
  endMeetingTime: {hours: string, minutes: string}
) {
  const startWork = `${startWorkTime.hours.padStart(2,"0")}:${startWorkTime.minutes}`;
  const endWork = `${endWorkTime.hours.padEnd(2,"0")}:${endWorkTime.minutes}`;
  const startMeeting = `${startMeetingTime.hours.padStart(2,"0")}:${startMeetingTime.minutes}`;
  const endMeeting = `${endMeetingTime.hours.padStart(2,"0")}:${endMeetingTime.minutes}`;

  return startWork <= startMeeting && endWork >= endMeeting;
}

const canMeet = scheduleMeeting("18:15", 15);

console.log(`Is it possible to meet? : ${canMeet}`);
