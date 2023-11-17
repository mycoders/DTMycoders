import { NextStudio } from "next-sanity/studio";
import sanityConfig from "../../sanity.config";

export default function Admin() {
  return <NextStudio config={sanityConfig} />;
}
