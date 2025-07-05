import { Router, IRouter, Request, Response, NextFunction } from 'express'
import asyncWrap from './asyncWrap'
import {exec, execFile} from 'node:child_process'
import path from 'path'
import axios from 'axios'
import cheerio from 'cheerio'

export default class Routes {
  router: IRouter

  constructor() {
    this.router = Router()
    this.router.use(this.errorHandler)
    this.router.use('/facebook', asyncWrap(this.getFacebookData.bind(this)))
    this.router.use('/instagram', asyncWrap(this.getInstagramData.bind(this)))
    this.router.use('/tiktok', asyncWrap(this.getTiktokData.bind(this)))
    this.router.use('/youtube', asyncWrap(this.getYoutubeData.bind(this)))
    this.router.use('/x', asyncWrap(this.getXData.bind(this)))
  }

  getRouter(): IRouter {
    return this.router
  }

  async errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Promise<void> {
    console.error(err)
    next()
  }

  async getFacebookData(req: Request, res: Response) {
    try {
      const url = `https://api.apify.com/v2/datasets/ICIpjjeyp4XCyEpR4/items`

      const { data } = await axios.get(url)

      return res.status(200).json({
        follower_count: data[0].followers
      })

    } catch (err: unknown) {
      console.error(err)
      return res.status(500).end()
    }
  }

  async getInstagramData(req: Request, res: Response) {
    try {
      const curlCmd: string = `curl "https://www.instagram.com/graphql/query" -H "accept: */*" -H "accept-language: en-US,en;q=0.9" -H "cache-control: no-cache" -H "content-type: application/x-www-form-urlencoded" -b "csrftoken=j5O-aQTKdsK9QkrvsAKrpC; datr=qqpmaD1WEUXrvsNKgeR8LFDS; ig_did=AEB815D3-1854-4514-99F0-42E4F8D3142D; ps_l=1; ps_n=1; ig_nrcb=1; mid=aGaqqwALAAHJh07g5lYagqWXPfnv; wd=2828x151" -H "origin: https://www.instagram.com" -H "pragma: no-cache" -H "priority: u=1, i" -H "referer: https://www.instagram.com/michal_lev_social/" -H "sec-ch-prefers-color-scheme: light" -H "sec-ch-ua: \\"Not)A;Brand\\";v=\\"8\\", \\"Chromium\\";v=\\"138\\", \\"Google Chrome\\";v=\\"138\\"" -H "sec-ch-ua-full-version-list: \\"Not)A;Brand\\";v=\\"8.0.0.0\\", \\"Chromium\\";v=\\"138.0.7204.50\\", \\"Google Chrome\\";v=\\"138.0.7204.50\\"" -H "sec-ch-ua-mobile: ?0" -H "sec-ch-ua-platform: \\"Windows\\"" -H "sec-ch-ua-platform-version: \\"10.0.0\\"" -H "sec-fetch-dest: empty" -H "sec-fetch-mode: cors" -H "sec-fetch-site: same-origin" -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36" -H "x-asbd-id: 359341" -H "x-bloks-version-id: 80875d0dbff5faa964af32b8cd7ab9a8e5ba53e71cf6430c7661fe77ca7f40d1" -H "x-csrftoken: j5O-aQTKdsK9QkrvsAKrpC" -H "x-fb-friendly-name: PolarisProfilePageContentQuery" -H "x-fb-lsd: AVpTsNhrq1o" -H "x-ig-app-id: 936619743392459" -H "x-root-field-name: fetch__XDTUserDict" --data-raw "av=0&__d=www&__user=0&__a=1&__req=4&__hs=20272.HYP%3Ainstagram_web_pkg.2.1...0&dpr=1&__ccg=EXCELLENT&__rev=1024402862&__s=styukd%3Addrsie%3Aajk7qx&__hsi=7522887918397257779&__dyn=7xe5WwlEnwn8K2Wmm1twpUnwgU7S6EdF8aUco38w5ux609vCwjE1EE2Cw8G11wBw5Zx62G3i1ywOwv89k2C0iK0D82YK0EUjwGzEaE2iwNwmE2exu16wUw7VwLyES1TwTwFwIwbS1LwTwKG1pg2Xwr86C1mg6LhA6bwg8rAwHxW1oxe6UaU3cyVoK9w4rxO2Cq&__csr=n0yPiEkzT235gEDnblbJeCiLBA_GF9fnlJiBh4CrmFk_qximiqmqpcGnKA25peinGdzumFehXQVoyuSKV98G4KiijBhAfBoHp9WmtoJ5DU-azpbyEGqEyjzUix52FaG6uiUm-meDzuJaV5V4jKi9BAG5ppox5ADz8TxqcDBx11-4ayUeF9WACgCiq00lnhxucK0wE9Q2G0jGO04Zo4W3e7Ux2Ha0A83_w4py4aw41w962W0eOw1Nm5tXy495oaEhwbq0ie0A40DogGvxW0gpz4kOxa0gq8gGp0c20Qaa0DV5w6ey400B1o0LK037O&__hsdp=l6Mog9Zsl4jNAaPBJUhC2O5yyAh19i2o2yAhUvzEEWyqe9LbFw8G4o22onwHwJxC8wSU9SaFoGEkx2awi85VxgXxGm2C2i3O3yexa8x23q1Gz8hBw50G0uS1ww32o2Hwba5U2wx21Sxm3-0AU2mw9e0hG1Xwpm4VU11U5MUqDzawhE560KU62&__hblp=0lU4u1bxW7EK0Pomwko2rwiEcE7i5o8HwjorBABHyVEggCEeEG362e8wXh89GwAwYwPJ3Eiy8Gm3eEoxS2G8z8hBw50G0BU2zzo9US1ixG2C3qt0sE2Swr81d8d86i0wEfUdEny8b8y1jzogwDwKwgEcE2jw9q0AU16EeEvwwwpm4VU2Vwjo4u53G5aDUHgcUhm1fwJg7S9AwhUozEtw&__comet_req=7&lsd=AVpTsNhrq1o&jazoest=21031&__spin_r=1024402862&__spin_b=trunk&__spin_t=1751558836&__crn=comet.igweb.PolarisProfileRoute&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=PolarisProfilePageContentQuery&variables=%7B%22id%22%3A%2264708503546%22%2C%22render_surface%22%3A%22PROFILE%22%7D&server_timestamps=true&doc_id=9916454141777118"`;

      exec(
        curlCmd,
        { shell: 'cmd.exe', maxBuffer: 10 * 1024 * 1024 },
        (err, stdout, stderr) => {
          if (err) {
            console.error('[getInstagramData]:', err)
            return res.status(500).json({
              success: false,
              message: err.message
            })
          }
          try {
            const { data } = JSON.parse(stdout)
            return res.status(200).json({ follower_count: data.user.follower_count })
          } catch (err: unknown) {
            console.error('[getInstagramData]:', err)
            return res.status(502).json({
              success: false,
              message: 'Bad Instagram response',
            })
          }
        }
      )
    } catch (err: unknown) {
      console.error(err)
      return res.status(500).end()
    }
  }

  async getTiktokData(req: Request, res: Response) {
    try {

      const { data } = await axios.get('', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        }
      })

      return res.status(200).json({
        follower_count: data.itemList.length > 0 ? data.itemList[0].authorStats.followerCount : 0
      })

    } catch (err: unknown) {
      console.error(err)
      return res.status(500).end()
    }
  }

  async getYoutubeData(req: Request, res: Response) {
    try {

      return res.status(200).json({
        success: true,
      })

    } catch (err: unknown) {
      console.error(err)
      return res.status(500).end()
    }
  }

  async getXData(req: Request, res: Response) {
    try {

      return res.status(200).json({
        success: true,
      })

    } catch (err: unknown) {
      console.error(err)
      return res.status(500).end()
    }
  }
}
