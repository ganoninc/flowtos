import ReactDOM from 'react-dom'
import ReactGA from 'react-ga4'
import './custom.scss'
import './index.css'
import { Flowtos } from './Flowtos'

ReactGA.initialize('G-NKHEEYGE2L')

const photoLibraryEndpoint = process.env.PUBLIC_URL + '/photo-library-ressources/'

ReactDOM.render(
    <Flowtos photoLibraryEndpoint={photoLibraryEndpoint} />,
    document.getElementById('root'),
)
