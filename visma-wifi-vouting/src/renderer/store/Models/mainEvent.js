class MainEventModel {
  id
  name
  description
  createdAt

  constructor (title, description) {
    this.title = title
    this.description = description
    this.createdAt = Date.now()
  }
}

export default MainEventModel
