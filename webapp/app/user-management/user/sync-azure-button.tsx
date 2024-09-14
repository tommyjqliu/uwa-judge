import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function SyncAzureButton() {
    return (
        <Button size="sm"><RefreshCcw size={16} className="mr-2" />Sync Azure User</Button>
    )
}