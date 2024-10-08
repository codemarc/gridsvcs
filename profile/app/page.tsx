import Link from "next/link";
import Image from "next/image";
import styles from './home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <div className="row">
      <div className={styles.imageContainer} />
      <h1 className="header">GridSvcs</h1>
      <div className="col-12">
        <p className={styles.subheader}>
          Support for the GridLinks experience.
        </p>
      </div>
      <Link className="col-12" href="/login">
        login to access user authenticated services
      </Link>
      <div className="col-12">
        <h2 className={styles.header}>User Authenticated Services</h2>
        <div className="row">
          <details className="col-12">
            <summary>user profile service</summary>
            <Link className="col-12" href="#">
              api documentation
            </Link>
            <br /><br />

          </details>
        </div>
      </div>
      <div className="col-12">
        <h2 className={styles.header}>User Authentication Not Required</h2>
        <div className="row">
          <details className="col-12">
            <summary>quotes / message of the day</summary>
            <Link className="col-12" href="https://codemarc.net/api/v1/motd/api-docs/">
              api documentation
            </Link>
            <br /><br />
            <table className={`col-12 ${styles.tightTable}`}>
              <tbody>
                <tr>
                  <td className="col-2">quotes</td>
                  <td className="col-6">
                    <a href="https://codemarc.net/api/v1/motd/quotes?format=html">as html</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://codemarc.net/api/v1/motd/quotes?format=text">as text</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://codemarc.net/api/v1/motd/quotes?format=json">as json</a>
                  </td>
                </tr>
                <tr>
                  <td className="col-2">topics</td>
                  <td className="col-6">
                    <a href="https://codemarc.net/api/v1/motd/topics?format=html">as html</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://codemarc.net/api/v1/motd/topics?format=text">as text</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://codemarc.net/api/v1/motd/topics?format=json">as json</a>
                  </td>
                </tr>
                <tr>
                  <td className="col-2">status</td>
                  <td className="col-6">
                    <a href="">as html</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="">as text</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="">as json</a>
                  </td>
                </tr>
              </tbody>
            </table>


            <dl className='col-12'>
              <dt className='col-2'>quotes</dt>
              <dd className='col-10'>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/quotes?format=html">
                  as html
                </Link>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/quotes?format=text">
                  as text
                </Link>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/quotes?format=json">
                  as json
                </Link>
              </dd>
              <dt className='col-2'>topics</dt>
              <dd className='col-10'>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/topics?format=html&cache=true">
                  as html
                </Link>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/topics?format=text&cache=true">
                  as text
                </Link>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/topics?format=json&cache=true">
                  as json
                </Link>
              </dd>
              <dt className='col-2'>status</dt>
              <dd className='col-10'>
                <Link className='col-2' href="https://codemarc.net/api/v1/motd/status">
                  as json
                </Link>
              </dd>
            </dl>
          </details>
        </div>
      </div >
    </div >
  )
}
