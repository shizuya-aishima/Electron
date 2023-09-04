import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../header'

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ul>
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/counter">記事一覧</Link></li>
      </ul>
      <h1>ホーム</h1>
    </div>
  )
}

export default Home