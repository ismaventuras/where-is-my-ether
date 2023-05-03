import { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import { isAddress } from 'viem'

export default function Form({ state, setState }: { state: FormState, setState: Dispatch<SetStateAction<FormState>> }) {
  const addressInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = addressInputRef.current?.value || ""
    const isValid = isAddress(address)

    setState({
      address: address,
      valid: isValid,
      error: isValid ? "" : "Not a valid address"
    })
  }


  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 mt-2">      
      <input required type='text' name="address" ref={addressInputRef} className='p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 max-w-sm w-full' />
      <button className='border px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-slate-100'>Search</button>
      {state.error && <p className='text-red-500'>{state.error}</p>}
    </form>
  )
}
