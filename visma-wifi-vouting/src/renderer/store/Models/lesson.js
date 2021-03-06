class LessonModel {
  id
  title
  description
  createdAt
  saltId
  mainEventId
  isActive
  results
  constructor (mainEventId, title, description) {
    this.mainEventId = mainEventId
    this.title = title
    this.description = description
    this.createdAt = Date.now()
    this.saltId = this.guid()
    this.isActive = false
    this.results = {
      green: 0,
      yellow: 0,
      red: 0
    }
    this.closed = false
  }

  guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
}

export default LessonModel
