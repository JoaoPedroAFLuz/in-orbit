import { CheckCircle2, Plus } from 'lucide-react';

import { InOrbitIcon } from '@/components/in-orbit-icon';
import { OutlineButton } from '@/components/ui/outline-button';
import { Button } from '@ui/button';
import { DialogTrigger } from '@ui/dialog';
import { Progress, ProgressIndicator } from '@ui/progress-bar';
import { Separator } from '@ui/separator';

export function Summary() {
  return (
    <div className="max-w-[480px] px-5 py-10 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />

          <span className="text-lg font-semibold">05 a 12 de Agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={5} max={15}>
          <ProgressIndicator style={{ width: '100%' }} />
        </Progress>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou <span className="text-zinc-100">8</span> de{' '}
          <span className="text-zinc-100">15</span> metas nessa semana.
        </span>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4" />
          Atividade
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo <span className="text-zinc-400 text-xs">(8 de Agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />

              <span className="text-zinc-400 text-sm">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <span className="text-zinc-100">08:13h</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
