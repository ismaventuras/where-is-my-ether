import { useState } from 'react'
import Form from '@/components/Form'
import Balance from '@/components/Balance'
import Image from 'next/image'

export default function Home() {
  const [state, setState] = useState<FormState>({
    address: "",
    valid: false,
    error: ""
  })


  return (
    <div className='p-2 md:p-0 container mx-auto max-w-lg'>
      <div className='text-center mb-4'>
        <h1 className='text-3xl font-bold flex justify-center items-center'>Where is my <Image src="ethereum_moving.gif"  alt="ETH" width={64} height={64}/> ?</h1>
        <h2 className='text-xl font-light'>Have been sending your ether across chains and now you don't know where it is? Paste your address and find how many ether you have on every chain using ether as native currency!</h2>
      </div>
      <Form state={state} setState={setState} />
      {state.valid && <Balance address={state.address} />}
    </div>
  )
}
