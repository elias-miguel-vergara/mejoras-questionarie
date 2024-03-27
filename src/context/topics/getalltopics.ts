import * as fs from 'fs'
import path from 'path'

export function getAllTopics() {
  let dirPath = path.join(process.cwd(), 'src/context/topics')

  const topics: any[] = []

  fs.readdirSync(dirPath).forEach(function (file: any) {
    let fileName = file
    if (fileName.includes('.json')) {
      const json = require('./' + fileName)

      for (let topicName in json.skill) {
        topics.push(json.skill[topicName])
      }
    }
  })

  return topics
}
