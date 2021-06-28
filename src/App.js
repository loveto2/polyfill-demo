import logo from './logo.svg';
import './App.css';

function App() {
  /****** case one *******/
  const downloadBtn = ({ filename, ext }) => {
    const download = () => {
      import(`../public/files/${filename}.${ext}`).then(file => {
        const linkElemet = document.createElement('a')
        linkElemet.setAttribute('href', file.default)
        linkElemet.setAttribute('download', `${filename}.${ext}`)
        linkElemet.style.visibility = 'hidden'
        document.body.appendChild(linkElemet)
        linkElemet.click()
        document.body.removeChild(linkElemet)
      })
      return false
    }
    download()
  }
  downloadBtn()
  /****** case two *******/
  const form = {}
  const item = {
    buyername: 'candy girl',
    taxnum: 1314520,
    address: '杭州',
    telephone: 1314520,
    account: 1314520,
    phone: 1314521,
    email: '1314520@qq.com'
  }
  form?.setFieldsValue({
    buyername: item.buyername || '',
    taxnum: item.taxnum || '',
    address: `${item.address || ''}${item.telephone || ''}`,
    account: item.account || '',
    phone: item.phone || '',
    email: item.email || ''
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
