import Container from '@/components/Container'
import SignupForm from '@/components/SignupForm'
import React from 'react'
import img from "@/assets/youjeen-cho-sMzctZfr4O4-unsplash.jpg"
import Image from 'next/image'
const SignUpPage = () => {
  return (
    <Container className='w-screen h-screen relative'>
      <Image src={img} alt='backimage' fill className='object-cover -z-10'/>
      <Container className='w-5/6 md:w-[45%]'>
        <SignupForm/>
      </Container>
    </Container>
  )
}

export default SignUpPage
