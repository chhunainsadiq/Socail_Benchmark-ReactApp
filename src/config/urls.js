const API = 'http://localhost:8000'
const clientURL = 'http://localhost:3000'
const LoginURL = `${API}/accounts/login`
const RegisterURL = `${API}/accounts/register`
const FetchProfileURL = `${API}/instagram_benchmark/profile`
const FetchMediaURL = `${API}/instagram_benchmark/media?page=`
const FetchMediaDetailURL = `${API}/instagram_benchmark/media/revision`
const CrawlUserURL = `${API}/instagram_benchmark/profile/crawl`
const CrawlStatusURL = `${API}/instagram_benchmark/profile/crawl/status`
const CrawlImagesDownloadURL = `${API}/instagram_benchmark/profile/crawl/zip`
const InstaRedirect =
  'https://api.instagram.com/oauth/authorize/?client_id=4d8f538893ba481f88c0614865dc9310&redirect_uri=http://127.0.0.1:3000/igconnected&response_type=token'
const FetchNewDataURL = `${API}/instagram_benchmark/profile/load`
const HeaderLogoURL =
  'https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg'
export {
  API,
  clientURL,
  LoginURL,
  RegisterURL,
  FetchProfileURL,
  FetchMediaURL,
  FetchMediaDetailURL,
  InstaRedirect,
  FetchNewDataURL,
  CrawlUserURL,
  CrawlStatusURL,
  CrawlImagesDownloadURL,
  HeaderLogoURL
}
