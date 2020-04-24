import moment from 'moment'

export default {
  work: {
    start: moment().utcOffset(0).set({
      hour: 8,
      minute: 0,
      second: 0,
      millisecond: 0
    }).format(),
    end: moment().utcOffset(0).set({
      hour: 17,
      minute: 30,
      second: 0,
      millisecond: 0
    }).format()
  }
}
