import {createClient, groq} from 'next-sanity'
import {createClient as createServerCLient}   from '@sanity/client' 

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-26"

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false, // if you're using ISR or only static generation at build time, then you can set this to `false` to guarantee no stale content
  studioUrl: '/studio', // Or: 'https://my-cool-project.sanity.studio'
  encodeSourceMap: true, // Optional. Default to: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
})
export const serverClient = createServerCLient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false, // set to `false` to bypass the edge cache
  token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})


// get a user 
export const getWalletUserSanity = async (address: string) => {
  return await client.fetch(
    groq`*[_type == "users" && walletAddress == "${address}"]`
  )
}