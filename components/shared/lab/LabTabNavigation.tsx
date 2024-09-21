import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { Users, Brain, MessageSquare, Mic, Puzzle } from 'lucide-react';

const LabTabNavigation = () => {
    return (
        <div className="flex h-2 items-center space-x-4 text-sm">
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/profile-creation" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Profile Creation
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/prompt-creation" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Prompt Creation
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/voice-cloning" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Mic className="w-4 h-4 mr-2" />
            Voice Cloning
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/extension-creation" className="p-20-regular text-dark-400 cursor-pointer flex items-center">
            <Puzzle className="w-4 h-4 mr-2" />
            Extension Creation
        </Link>
        <Separator orientation="vertical" className="h-6" />
    </div>
    )
}

export default LabTabNavigation;