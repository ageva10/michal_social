import { Flip } from './components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons'

type SocialProps = {
  name: string
  icon: any
  count: number
  color: string
  background: string
}

const social: SocialProps[] = [
  {
    name: 'Facebook',
    icon: faFacebook,
    count: 0o000000,
    color: '#fff',
    background: 'linear-gradient(135deg, #1877f2, #3b5998)'
  },
  {
    name: 'Instagram',
    icon: faInstagram,
    count: 0o000000,
    color: '#fff',
    background: 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)'
  },
  {
    name: 'TikTok',
    icon: faTiktok,
    count: 0o000000,
    color: '#fff',
    background: 'linear-gradient(135deg, #25f4ee, #fe2c55, #000000)'
  },
  {
    name: 'YouTube',
    icon: faYoutube,
    count: 0o000000,
    color: '#fff',
    background: 'linear-gradient(135deg, #ff0000, #cc0000, #000000)'
  },
  {
    name: 'X',
    icon: faXTwitter,
    count: 0o000000,
    color: '#fff',
    background: 'linear-gradient(135deg, #000000, #1a1a1a, #2c2c2c)'
  }
]

function App() {
  return (
    <div className="app">
      {social.map(({ name, icon, count, color, background }: SocialProps) => (
        <section key={name}>
          <div className="container" style={{ background }}>
            <div className="icon">
              <FontAwesomeIcon icon={icon} size="xl" color={color} />
            </div>
            <Flip value={count} />
          </div>
        </section>
      ))}
    </div>
  )
}

export default App
