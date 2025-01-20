import { Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Sprint, Task } from '../types';

interface SprintProgressProps {
  currentSprint: Sprint;
  tasks: Task[];
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-medium">{task.title}</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
            task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">{task.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">
          <Clock className="w-4 h-4 inline mr-1" />
          {task.dueDate}
        </div>
        {task.status === 'completed' ? 
          <CheckCircle className="w-5 h-5 text-green-400" /> :
          task.status === 'in_progress' ? 
          <Activity className="w-5 h-5 text-blue-400" /> :
          <AlertCircle className="w-5 h-5 text-yellow-400" />
        }
      </div>
    </div>
  </div>
);

export const SprintProgress = ({ currentSprint, tasks }: SprintProgressProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Sprint Progress
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}; 