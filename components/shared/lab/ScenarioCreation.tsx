import { Separator } from "@/components/ui/separator";

export const ScenarioCreation = () => {
    return (
      <div className="root-container">
        <h2 className="h2-bold text-dark-600" style={{ marginTop: '-10px' }}>
          Scenario Creation
        </h2>
        <p className="p-20-regular text-dark-400 mt-2" style={{ marginTop: '15px' }}>
            Quickly create and share unique scenarios for your AI. Chain together prompts to guide your AI through engaging interactions and tasks.
        </p>
        <Separator className="my-4" />

        <div>
          <h1>Coming soon...</h1>
        </div>
      </div>
    )
  }