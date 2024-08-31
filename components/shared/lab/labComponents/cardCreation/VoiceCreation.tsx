import { Separator } from "@/components/ui/separator";

const ExtensionCreation = () => {
    return (
      <div className="root-container">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: '0px' }}>
          Voice Cloning
        </h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Upload audio data to clone any voice of your choosing
        </p>
        <Separator className="my-4" />

        <div>
          <h1>Coming soon...</h1>
        </div>
      </div>
    )
  }

  export default ExtensionCreation