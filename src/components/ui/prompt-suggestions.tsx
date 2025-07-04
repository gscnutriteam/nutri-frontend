import { Sparkles } from "lucide-react";
import Image from "next/image";

interface PromptSuggestionsProps {
  label: string
  append: (message: { role: "user"; content: string }) => void
  suggestions: string[]
}

export function PromptSuggestions({
  label,
  append,
  suggestions,
}: PromptSuggestionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-bold px-10">{label}</h2>
      <div className="flex w-full justify-center">
      <Image alt="Nubo" width={100} height={100} className="place-self-center" src="/assets/img/nubo.png" />
      </div>
      <div className="flex gap-6 text-sm flex-col text-left">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            key={suggestion}
            onClick={() => append({ role: "user", content: suggestion })}
            className="h-max flex items-center shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none gap-3 text-left flex-1 rounded-xl border border-black bg-white p-4 hover:bg-muted"
          >
            <Sparkles className="w-4 h-4" />
            <p>{suggestion}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
