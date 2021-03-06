import {promises as fs} from 'fs'
import * as mustache from 'mustache'
import * as path from 'path'
import * as url from 'url'

export interface IStore {
  // check in cache, if so, return etag
  check(options): Promise<string>
  read(request, options): Promise<any>
  write(response, options): Promise<void>
}

export class FileSystemStore implements IStore {
  _path: string

  constructor(path: string) {
    this._path = path
  }

  private getUrlPath(options): string {
    const pathPart = url.parse(options.url).path
    const urlFormat = pathPart
      .replace(new RegExp('{', 'g'), '{{{')
      .replace(new RegExp('}', 'g'), '}}}')
    const urlPath = mustache.render(urlFormat, options)

    return urlPath
  }

  public async check(options): Promise<string> {
    const urlPath = this.getUrlPath(options)
    const cachePath = path.join(this._path, urlPath)
    const etagPath = path.join(cachePath, 'etag')
    process.stdout.write(urlPath)

    let exists = true
    try {
      await fs.stat(path.join(cachePath, 'res.json'))
      await fs.stat(path.join(cachePath, 'etag'))
    } catch (err) {
      exists = false
    }

    let etag: string
    if (exists) {
      etag = (await fs.readFile(etagPath)).toString()
    }

    return etag
  }

  public async read(response, options): Promise<any> {
    const urlPath = this.getUrlPath(options)
    const cachePath = path.join(this._path, urlPath)
    const contents = (
      await fs.readFile(path.join(cachePath, 'res.json'))
    ).toString()

    return JSON.parse(contents)
  }

  public async write(response, options): Promise<void> {
    const urlPath = this.getUrlPath(options)
    const cachePath = path.join(this._path, urlPath)

    await fs.mkdir(cachePath, {recursive: true})
    await fs.writeFile(
      path.join(cachePath, 'res.json'),
      JSON.stringify(response, null, 2),
      'utf8'
    )
    await fs.writeFile(
      path.join(cachePath, 'etag'),
      response.headers.etag,
      'utf8'
    )

    return
  }
}
