import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './custom.scss'
import './index.css'
import Flowtos from './Flowtos'

ReactGA.initialize('G-NKHEEYGE2L')

const photoLibraryEndpoint = process.env.PUBLIC_URL + '/photo-library-ressources/'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<Flowtos photoLibraryEndpoint={photoLibraryEndpoint} />)
