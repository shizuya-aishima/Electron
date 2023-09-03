import { Tab } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import Home from '../home'
import { Counter } from '../counter'
import { Seal } from '../seal'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='min-w-full'>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Tab.Group >
        <Tab.List className="m-auto">
          <Tab >home</Tab>
          <Tab >counter</Tab>
          <Tab >seal</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel><Home /></Tab.Panel>
          <Tab.Panel><Counter /></Tab.Panel>
          <Tab.Panel><Seal /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}