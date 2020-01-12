import aria2 from './aria2'

const usingHTTPS = () => {
	return window.location.protocol === 'https:'
}

export default {
	usingHTTPS,
	shouldShowAriaHTTPSWarning: () => {
		return usingHTTPS() && !aria2.getRpcSecure()
	}
}
