import Dexie from 'dexie'

const db = new Dexie('VismaVouting')
db.version(1).stores({
  mainEvent: '++id,title,description,createdAt',
  lesson: '++id,mainEventId,title,description,created,saltId'
})

export default db
