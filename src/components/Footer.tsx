import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className='bg-gray-900'>
        <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
          <div className="grid md:grid-cols-4 gap-7">
            {/* section 1 */}
            <div>
              <Link href="/" className='mb-10 block'>
                <Image src="/images/logo.png" width={128} height={49} alt='Logo Portfolio Ivan Sukhito'></Image>
              </Link>
              <p className='text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit earum doloremque ea mollitia, sint rerum!
              </p>
            </div>
            {/* section 2 */}
            <div>
                <div className='flex gap-20'>
                  <div className="flex-1 md:flex-none">
                    <h4 className='mb-8 text-xl font-semibold text-white'>Links</h4>
                    <ul className='list-item space-y-5 text-gray-400'>
                      <li>
                        <Link href="/">Homepage</Link>
                      </li>
                      <li>
                        <Link href="/about">About Us</Link>
                      </li>
                      <li>
                        <Link href="/room">Rooms</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            {/* section 3 */}
            <div>
             <div className='flex gap-20'>
                <div className="flex-1 md:flex-none">
                  <h4 className='mb-8 text-xl font-semibold text-white'>Links</h4>
                  <ul className='list-item space-y-5 text-gray-400'>
                    <li>
                        <Link href="#">Legal</Link>
                    </li>
                    <li>
                      <Link href="#">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="#">Payment Method</Link>
                    </li>
                    <li>
                      <Link href="#">FAQ</Link>
                    </li>
                  </ul>
                </div>
              </div> 
            </div>
          {/* section 4 */}
          <div>
            <h4 className='mb-8 text-xl font-semibold text-white'>NewsLetter</h4>
            <p className='text-gray-400'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit rem debitis.
            </p>
            <form action="" className='mt-5'>
              <div className='mb-5'>
                <input type="text" name="email" className='w-full p-3 rounded-sm text-black bg-white border-2 border-orange-500' 
                placeholder='sukhitoo@mail.com'/>
              </div>
              <button className='bg-orange-400 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-orange-500'>Subscribe</button>
            </form>
          </div>

          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
          &copy; Copyright 2026 - Ivan Sukhito
        </div>
    </footer>
  )
}

export default Footer
