import Dexie from 'dexie'

const db = new Dexie('VismaVouting')
db.version(1).stores({
  mainEvent: '++id,title,description,createdAt',
  lesson: '++id,title,description,createdAt,saltId,mainEventId,isActive,results'
})

export default db
