import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-BR';
import { Toaster } from 'react-hot-toast';

import { useGetSummary } from '@hooks/use-get-summary';

import { CreateGoal } from '@components/create-goal';
import { Loader } from '@components/loader';
import { Portal } from '@components/ui/portal';
import { EmptyGoals } from '@pages/empty-goals';
import { Summary } from '@pages/summary';
import { Dialog } from '@ui/dialog';

dayjs.locale(ptBR);

export function App() {
  const { summary, isLoadingSummary } = useGetSummary();

  return (
    <Dialog>
      {isLoadingSummary && (
        <Portal>
          <Loader variant="primary" size="large" />
        </Portal>
      )}

      {summary?.total ? <Summary /> : <EmptyGoals />}

      <CreateGoal />

      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </Dialog>
  );
}
