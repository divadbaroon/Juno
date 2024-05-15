import { Separator } from "@/components/ui/separator";

export const PromptCreation = () => {
    return (
      <div className="root-container">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
          Prompt Creation
        </h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
          Craft prompts to shape your AI&apos;s behavior and personality. Use clear instructions, examples, and tone guidelines to align your AI with your goals.
        </p>
        <Separator className="my-4" />

        <div>
          <h1>Coming soon...</h1>
        </div>
      </div>
    )
  }