import BgImageSelection from "./PageLayoutComponents/BgImageSelection"
import BgImageEditings from "./PageLayoutComponents/BgImageEditings"
import CompoDesignOptions from "./PageLayoutComponents/CompoDesignOptions"
const PageLayout = ({ user }) => {
  return (
    <div className="w-[90%] mx-auto py-6 mt-2 space-y-6 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">
        Page Layout Design
      </h1>

      {/* The Background images search and preview section */}
      <BgImageSelection user={user} />

      {/* Background Image editings  */}
      <BgImageEditings user={user} />

      {/* Design customization for the page options are here  */}
      <CompoDesignOptions user={user} />
    </div>
  )
}

export default PageLayout