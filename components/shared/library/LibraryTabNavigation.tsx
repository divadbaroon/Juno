import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const LibraryTabNavigation = () => {
    return (
    <div className="flex h-5 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
        <Link href="/library/profiles" className="p-20-regular text-dark-400 cursor-pointer">Profiles</Link>
        <Separator orientation="vertical" />
        <Link href="/library/llms" className="p-20-regular text-dark-400 cursor-pointer">LLMs</Link>
        <Separator orientation="vertical" />
        <Link href="/library/prompts" className="p-20-regular text-dark-400 cursor-pointer">Prompts</Link>
        <Separator orientation="vertical" />
        <Link href="/library/voices" className="p-20-regular text-dark-400 cursor-pointer">Voices</Link>
        <Separator orientation="vertical" />
        <Link href="/library/extensions" className="p-20-regular text-dark-400 cursor-pointer">Extensions</Link>
        <Separator orientation="vertical" />
    </div>
    )
}

export default LibraryTabNavigation;