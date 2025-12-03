import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Trigger from "./trigger";

/**
 * This page is used to clear next.js Client-side Router Cache
 * As sometimes session is changed but next.js does not revalidate the layout
 * ref: https://nextjs.org/docs/app/building-your-application/caching#opting-out-3
 * It is too tricky but works at the moment
 */
export default function page() {
  async function clearCache() {
    "use server";
    // revalidatePath("/", "layout");
    redirect("/");
  }
  return <Trigger callback={clearCache} />;
}
