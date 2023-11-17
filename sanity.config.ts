import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './sanity/schemas'


const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'DtrustSanityDashboard',



projectId,
dataset,
  plugins: [deskTool(), visionTool()],
    basePath:"/admin",
  schema: {
    types: schemas,
  },
})