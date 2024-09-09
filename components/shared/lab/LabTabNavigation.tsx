import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const LabTabNavigation = () => {
    return (
    <div className="flex h-2 items-center space-x-4 text-sm">
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/profile-creation" className="p-20-regular text-dark-400 cursor-pointer">Profile Creation</Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/prompt-creation" className="p-20-regular text-dark-400 cursor-pointer">Prompt Creation</Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/voice-cloning" className="p-20-regular text-dark-400 cursor-pointer">Voice Cloning</Link>
        <Separator orientation="vertical" className="h-6" />
        <Link href="/lab/extension-creation" className="p-20-regular text-dark-400 cursor-pointer">Extension Creation</Link>
        <Separator orientation="vertical" className="h-6" />
    </div>
    )
}

export default LabTabNavigation;