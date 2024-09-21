import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { Users, Brain, MessageSquare, Mic, Puzzle } from 'lucide-react';

const LibraryTabNavigation = () => {
    return (
    <div className="flex h-2 items-center space-x-4 text-sm">
        <Separator orientation="vertical" className="h-6" />
        <Link href="/library/profiles" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Profiles
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/library/llms" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            LLMs
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/library/prompts" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Prompts
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/library/voices" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Mic className="w-4 h-4 mr-2" />
            Voices
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/library/extensions" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Puzzle className="w-4 h-4 mr-2" />
            Extensions
        </Link>
        <Separator orientation="vertical" className="h-6" />
    </div>
    )
}

export default LibraryTabNavigation;