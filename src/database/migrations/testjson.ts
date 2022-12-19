import * as fs from 'fs'
import * as path from 'path'


function readFileJson(file: any) {
  try{
    let content = fs.readFileSync(file, "utf-8");
    return JSON.parse(content)

  } catch (error) {
    console.log(error)
  }
  
}

export const readingJson = readFileJson(
  path.resolve(__dirname, "./products.json")
  
)


