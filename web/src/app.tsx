import { Summary } from '@/pages/summary';
import { CreateGoal } from '@components/create-goal';
import { Dialog } from '@ui/dialog';

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />

      <CreateGoal />
    </Dialog>
  );
}
