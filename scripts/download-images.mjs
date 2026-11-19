// Downloads the images listed in images.manifest.json into public/images.
// Run once on your own machine (needs internet): npm run images
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

const manifest = JSON.parse(await readFile(new URL('../images.manifest.json', import.meta.url), 'utf8'))
const todo = manifest.images.filter((i) => i.url && i.url.trim())

if (!todo.length) {
  console.log('No URLs filled in yet. Add direct image links to images.manifest.json, then run again.')
  process.exit(0)
}

let ok = 0
for (const { file, url } of todo) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const type = res.headers.get('content-type') || ''
    if (!type.startsWith('image/')) throw new Error(`not an image (${type || 'unknown type'})`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, Buffer.from(await res.arrayBuffer()))
    console.log('saved  ', file)
    ok++
  } catch (err) {
    console.error('FAILED ', file, '-', err.message)
  }
}
console.log(`\nDone: ${ok}/${todo.length} downloaded. Restart "npm run dev" to see them.`)
