import React from 'react'
import { useState } from 'react'
import { Input } from '@/Components/ui/input'

const SocialMedia = () => {
  const [site, setSite] = useState("")
  return (
    <div>
      <Input placeholder="Site Name" onChange={(e) => setSite((e.target.value).toLowerCase())} value={site} />
      <img src={`https://www.google.com/s2/favicons?sz=64&domain=${site}.com
      `} alt={site} />
    </div>
  )
}

export default SocialMedia