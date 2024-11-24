import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TaskCard({ task }) {
  return (
    <Card className="mb-2">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-500 mb-2">{task.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${task.user}`} />
              <AvatarFallback>{task.user[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500">{task.user}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {task.project}
            </span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {task.category}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
